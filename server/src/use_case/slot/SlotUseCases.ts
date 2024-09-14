import ISlot, { SlotStatus } from "../../domain/entities/ISlot";
import ISlotRepository from "../../domain/interface/repositories/ISlotRepository";
import { Days } from "../../domain/entities/ISlot";
import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import { AppointmentStatus } from "../../domain/entities/IAppointment";

export default class SlotUseCase {
    protected interval: number;

    constructor(
        private slotRepository: ISlotRepository,
        private appointmentRepository:IAppointmentRepository
    ) {
        this.interval = 1;
    }

    async createManyByDay(doctorId: string, slots: ISlot[], day: Days): Promise<void> {
        const existingSlots = await this.slotRepository.findManyByDay(doctorId, day);
        const newSlots = slots
            .filter(slot => !existingSlots?.find(existing => existing.startTime === slot.startTime))
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
        const days = Object.values(Days);
        for (const day of days) {
            await this.slotRepository.deleteManyByDayAndTime(doctorId, day, startTimes);
        }
    }

    async update(slot: ISlot): Promise<void> {
        await this.slotRepository.update(slot);
    }

    async getAllSlots(doctorId: string): Promise<ISlot[] | null> {
        return await this.slotRepository.findMany(doctorId);
    }

    async getSlotsByDay(doctorId: string, day: Days): Promise<ISlot[] | null> {
        return await this.slotRepository.findManyByDay(doctorId, day);
    }

    async getSlotsByDate(doctorId: string, date: string): Promise<ISlot[] | null> {
        const day = this.getDayFromDate(date);
        return await this.slotRepository.findManyByDay(doctorId, day, "available");
    }

    private getDayFromDate(date: string): Days {
        const dayOfWeek = new Date(date).getUTCDay();
        const dayNames = Object.values(Days);
        return dayNames[dayOfWeek] as Days;
    }


    private calculateEndTime(startTime: string): string {
        const [hoursStr, minutesStr] = startTime.split(":");
        const hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);
        if (isNaN(hours) || isNaN(minutes)) {
            throw new Error("Invalid start time format");
        }
        const endHour = (hours + this.interval) % 24;
        return `${endHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

}

