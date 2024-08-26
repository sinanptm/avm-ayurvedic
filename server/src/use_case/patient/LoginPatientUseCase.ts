import { IPatient } from "../../domain/entities/Patient";
import IPatientRepository from "../../interface/repositories/IPatientRepository";
import { IPasswordServiceRepository } from "../../interface/services/IPasswordServiceRepository";

export default class LoginPatientUseCase {
   constructor(
      private patientRepository: IPatientRepository,
      private passwordService: IPasswordServiceRepository
   ) {}
   execute(patient: IPatient) {}
}
