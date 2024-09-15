import IAppointment, { AppointmentStatus, AppointmentType } from "../../domain/entities/IAppointment";
import ValidationError from "../../domain/entities/ValidationError";
import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import ISlotRepository from "../../domain/interface/repositories/ISlotRepository";
import IValidatorService from "../../domain/interface/services/IValidatorService";
import { StatusCode } from "../../types";

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
        if (!slot) throw new ValidationError("Slot Not Found", StatusCode.NotFound);
        
        if (slot.status === 'booked') {
            const bookedAppointment = await this.appointRepository.findByDateAndSlot(appointmentDate!, slotId!);
            if (bookedAppointment) throw new ValidationError("Slot already booked", StatusCode.Conflict);
        } else {
            slot!.status = 'booked';
        }
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