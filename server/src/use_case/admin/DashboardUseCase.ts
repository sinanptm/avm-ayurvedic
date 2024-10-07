import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import IDoctorRepository from "../../domain/interface/repositories/IDoctorRepository";
import IPatientRepository from "../../domain/interface/repositories/IPatientRepository";
import IValidatorService from "../../domain/interface/services/IValidatorService";
import { PatientGenderStatics } from "../../types/statics";

export default class DashboardUseCase {
    constructor(
        private validatorService: IValidatorService,
        private patientRepository: IPatientRepository,
        private appointmentRepository: IAppointmentRepository,
        private doctorRepository: IDoctorRepository
    ){}

    async getPatientGenderStatics():Promise<PatientGenderStatics>{
        return await this.patientRepository.findPatientGenders();
    }
}