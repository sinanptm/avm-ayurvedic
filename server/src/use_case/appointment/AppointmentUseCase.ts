import IAppointment, { AppointmentStatus } from "../../domain/entities/IAppointment";
import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import ISlotRepository from "../../domain/interface/repositories/ISlotRepository";

export default class AppointmentUseCase {
    constructor(
        private appointRepository: IAppointmentRepository,
        private slotRepository: ISlotRepository
    ) { }

    async create({ slotId, ...appointment }: IAppointment, patientId: string): Promise<void> {
        const slot = await this.slotRepository.findById(slotId!);
        if (!slot) throw new Error("Slot Not Found");
        if (slot.status==='booked') throw new Error("Slot already booked");
        slot!.status = 'booked';
        await this.slotRepository.update(slot);
        await this.appointRepository.create({ ...appointment, slotId, patientId, status: AppointmentStatus.PENDING });
    }

}