import { AppointmentStatus } from "../../domain/entities/IAppointment";
import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import IValidatorService from "../../domain/interface/services/IValidatorService";

export default class UpdateAppointmentUseCase {
    constructor(
        private appointmentRepository: IAppointmentRepository,
        private validatorService: IValidatorService
    ) { }

    async updateStatus(appointmentId: string, status: AppointmentStatus): Promise<void> {
        this.validatorService.validateRequiredFields({ appointmentId, status })
        this.validatorService.validateIdFormat(appointmentId);
        this.validatorService.validateEnum(status, Object.values(AppointmentStatus));
        await this.appointmentRepository.update({ _id: appointmentId, status })
    }

    async updateStatusAndNote(appointmentId: string, status: AppointmentStatus, notes: string): Promise<void> {
        this.validatorService.validateRequiredFields({ appointmentId, status, notes });
        this.validatorService.validateEnum(status, Object.values(AppointmentStatus));
        await this.appointmentRepository.update({ _id: appointmentId, status, notes });
    }
}