import IAppointment, { AppointmentStatus } from "../../domain/entities/IAppointment";
import { Days } from "../../domain/entities/ISlot";
import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import ISlotRepository from "../../domain/interface/repositories/ISlotRepository";

export default class AppointmentUseCase {
    constructor(
        private appointRepository: IAppointmentRepository,
        private slotRepository: ISlotRepository
    ) { }

    async create({ _id, startTime, doctorId, appointmentDate, ...appointment }: IAppointment, patientId: string): Promise<void> {
        const day = this.getDayFromDate(appointmentDate!)
        const slot = await this.slotRepository.findByDoctorIdStartTimeAndDay(_id!, doctorId!, startTime!, day);
        if (!slot) throw new Error("Slot Not Found");
        await this.appointRepository.create({ ...appointment, _id, startTime, doctorId, patientId, status: AppointmentStatus.PENDING });
    }

    private getDayFromDate(date: string): Days {
        const dayOfWeek = new Date(date).getUTCDay();
        const dayNames = Object.values(Days);
        return dayNames[dayOfWeek] as Days;
    }
}