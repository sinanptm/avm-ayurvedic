import IAppointment, { AppointmentStatus, AppointmentType } from "../../domain/entities/IAppointment";
import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import ISlotRepository from "../../domain/interface/repositories/ISlotRepository";
import IValidatorService from "../../domain/interface/services/IValidatorService";

export default class AppointmentUseCase {
    constructor(
        private appointRepository: IAppointmentRepository,
        private slotRepository: ISlotRepository,
        private validatorService: IValidatorService
    ) { }

    async create({ slotId, appointmentDate, appointmentType, reason, doctorId, notes }: IAppointment, patientId: string): Promise<void> {
        this.validatorService.validateRequiredFields({ slotId, appointmentDate, appointmentType, reason, doctorId });
        this.validatorService.validateIdFormat(doctorId!);
        this.validatorService.validateIdFormat(slotId!);
        this.validatorService.validateIdFormat(patientId!)
        this.validatorService.validateEnum(appointmentType!, Object.values(AppointmentType));
        this.validatorService.validateDateFormat(appointmentDate!);
        this.validatorService.validateLength(reason!, 1, 255);
        if (notes) this.validatorService.validateLength(notes, 0, 255);

        const slot = await this.slotRepository.findById(slotId!);
        if (!slot) throw new Error("Slot Not Found");
        if (slot.status === 'booked') throw new Error("Slot already booked");
        slot!.status = 'booked';
        await this.slotRepository.update(slot);
        await this.appointRepository.create({
            slotId,
            patientId,
            status: AppointmentStatus.PENDING,
            notes,
            appointmentDate,
            appointmentType,
            reason,
            doctorId
        });
    }

}