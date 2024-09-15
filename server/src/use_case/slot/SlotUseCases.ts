import ISlot, { SlotStatus, Days } from "../../domain/entities/ISlot";
import ISlotRepository from "../../domain/interface/repositories/ISlotRepository";
import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import IValidatorService from "../../domain/interface/services/IValidatorService";
import { AppointmentStatus } from "../../domain/entities/IAppointment";
import ValidationError from "../../domain/entities/ValidationError";
import { StatusCode } from "../../types";

export default class SlotUseCase {
    protected interval: number;

    constructor(
        private slotRepository: ISlotRepository,
        private appointmentRepository: IAppointmentRepository,
        private validatorService: IValidatorService
    ) {
        this.interval = 1;
    }


    async createManyByDay(doctorId: string, slots: ISlot[], day: Days): Promise<void> {
        this.validateSlotStartTimes(slots);
        this.validateDay(day);

        const existingSlots = await this.slotRepository.findManyByDay(doctorId, day);
        const newSlots = slots
            .filter(slot => !existingSlots?.some(existing => existing.startTime === slot.startTime))
            .map(slot => ({
                ...slot,
                doctorId,
                status: 'available' as SlotStatus,
                endTime: this.calculateEndTime(slot.startTime!),
                day,
            }));

        if (newSlots.length > 0) {
            await this.slotRepository.createMany(newSlots);
        }
    }

    async createForAllDays(doctorId: string, startTimes: string[]): Promise<void> {
        startTimes.forEach(time => {
            this.validatorService.validateTimeFormat(time);
            this.validatorService.validateLength(time, 7, 11);
        });

        const days = Object.values(Days);
        const slotsByDay = days.reduce((acc, day) => {
            acc[day] = startTimes.map(startTime => ({
                startTime,
            }));
            return acc;
        }, {} as Record<Days, ISlot[]>);

        for (const day of days) {
            const slots = slotsByDay[day];
            await this.createManyByDay(doctorId, slots, day);
        }
    }

    async deleteManyByDay(doctorId: string, slots: ISlot[], day: Days): Promise<void> {
        this.validateSlotStartTimes(slots);
        this.validateDay(day);

        const startTimes = slots.map(el => el.startTime!);

        const bookedSlots = await this.slotRepository.findManyByDay(doctorId, day, 'booked');

        if (bookedSlots?.length) {
            const bookedSlotIds = bookedSlots
                .filter(slot => startTimes.includes(slot.startTime!))
                .map(slot => slot._id)
                .filter((id): id is string => id !== undefined);

            if (bookedSlotIds.length > 0) {
                await this.appointmentRepository.updateManyBySlotIds(bookedSlotIds, {
                    status: AppointmentStatus.CANCELLED
                });
            }
        }
        await this.slotRepository.deleteManyByDayAndTime(doctorId, day, startTimes);
    }

    async deleteForAllDays(doctorId: string, startTimes: string[]): Promise<void> {
        startTimes.forEach(time => {
            this.validatorService.validateTimeFormat(time);
            this.validatorService.validateLength(time, 7, 11);
        });

        const days = Object.values(Days);

        const slots = await this.slotRepository.findManyByDaysAndTimes(doctorId, days, startTimes);

        if (slots?.length) {
            const bookedSlotIds = slots
                .filter(slot => slot.status === 'booked')
                .map(slot => slot._id)
                .filter((id): id is string => id !== undefined);

            if (bookedSlotIds.length > 0) {
                await this.appointmentRepository.updateManyBySlotIds(bookedSlotIds, {
                    status: AppointmentStatus.CANCELLED
                });
            }
            await this.slotRepository.deleteManyByDaysAndTimes(doctorId, days, startTimes);
        }
    }

    async update(slot: ISlot): Promise<void> {
        this.validatorService.validateIdFormat(slot._id!);
        this.validatorService.validateTimeFormat(slot.startTime!);
        await this.slotRepository.update(slot);
    }

    async getAllSlots(doctorId: string): Promise<ISlot[] | null> {
        this.validatorService.validateIdFormat(doctorId);
        return await this.slotRepository.findMany(doctorId);
    }

    async getSlotsByDay(doctorId: string, day: Days): Promise<ISlot[] | null> {
        this.validateDay(day);
        this.validatorService.validateIdFormat(doctorId);
        return await this.slotRepository.findManyByDay(doctorId, day);
    }

    async getSlotsByDate(doctorId: string, date: string): Promise<ISlot[] | null> {
        this.validatorService.validateIdFormat(doctorId);
        const appointments = await this.appointmentRepository.findManyByDateAndDoctorId(date, doctorId);
        const slotIds = appointments?.map(el => el.slotId!) || [];
        const day = this.getDayFromDate(date);
        return await this.slotRepository.findManyNotInSlotIds(doctorId, day, slotIds);
    }


    private getDayFromDate(date: string): Days {
        const dayOfWeek = new Date(date).getUTCDay();
        const dayNames = Object.values(Days);
        return dayNames[dayOfWeek] as Days;
    }

    private validateSlotStartTimes(slots: ISlot[]): void {
        slots.forEach(slot => {
            if (!slot.startTime) {
                throw new ValidationError(`Missing startTime for slot: ${JSON.stringify(slot)}`,StatusCode.BadRequest);
            }
            this.validatorService.validateTimeFormat(slot.startTime);
            this.validatorService.validateLength(slot.startTime, 7, 11);
        });
    }

    private validateDay(day: Days): void {
        if (!Object.values(Days).includes(day)) {
            throw new ValidationError('Invalid or missing day.',StatusCode.BadRequest);
        }
    }

    private calculateEndTime(startTime: string): string {
        const [time, period] = startTime.split(' ');
        const [hoursStr, minutesStr] = time.split(":");
        let hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);

        if (period === 'PM' && hours < 12) hours += 12;
        if (period === 'AM' && hours === 12) hours = 0;

        if (isNaN(hours) || isNaN(minutes)) {
            throw new ValidationError("Invalid start time format",StatusCode.BadRequest);
        }

        const endHour = (hours + this.interval) % 24;
        const endPeriod = endHour >= 12 ? 'PM' : 'AM';
        const displayHour = endHour % 12 || 12;

        return `${displayHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${endPeriod}`;
    }
}
