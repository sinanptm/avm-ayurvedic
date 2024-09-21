import ISlot, { Days } from "../../domain/entities/ISlot";
import ISlotRepository from "../../domain/interface/repositories/ISlotRepository";
import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import IValidatorService from "../../domain/interface/services/IValidatorService";

export default class GetSlotUseCase {
    constructor(
        private slotRepository: ISlotRepository,
        private appointmentRepository: IAppointmentRepository,
        private validatorService: IValidatorService
    ) {}

    async getAllSlots(doctorId: string): Promise<ISlot[] | null> {
        this.validatorService.validateIdFormat(doctorId);
        return await this.slotRepository.findMany(doctorId);
    }

    async getSlotsByDay(doctorId: string, day: Days): Promise<ISlot[] | null> {
        this.validatorService.validateEnum(day,Object.values(Days));
        this.validatorService.validateIdFormat(doctorId);
        return await this.slotRepository.findManyByDay(doctorId, day);
    }

    async getSlotsByDate(doctorId: string, date: string): Promise<ISlot[] | null> {
        this.validatorService.validateIdFormat(doctorId);
        this.validatorService.validateDateFormat(date);
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

}
