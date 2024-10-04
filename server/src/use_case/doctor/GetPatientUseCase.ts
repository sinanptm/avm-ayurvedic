import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import IValidatorService from '../../domain/interface/services/IValidatorService'
import { IExtendedAppointment } from "../../domain/entities/IAppointment";
import IPatient from "../../domain/entities/IPatient";
import { PaginatedResult } from "../../types";

export default class GetPatientUseCaseDoctor {
    constructor(
        private appointmentRepository: IAppointmentRepository,
        private validatorService: IValidatorService
    ) { }

    async exec(doctorId: string, limit: number, offset: number): Promise<PaginatedResult<IPatient>> {
        this.validatorService.validateIdFormat(doctorId);
        return await this.appointmentRepository.findPatientsByDoctorId(doctorId, limit, offset);
    }

    async getMedicalHistory(patientId: string, offset: number, limit: number): Promise<PaginatedResult<IExtendedAppointment>> {
        this.validatorService.validateIdFormat(patientId)
        return await this.appointmentRepository.findManyAsExtendedByPatientId(patientId, limit, offset)
    }
}