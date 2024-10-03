import IPatient from "../../domain/entities/IPatient";
import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import IValidatorService from '../../domain/interface/services/IValidatorService'
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
}