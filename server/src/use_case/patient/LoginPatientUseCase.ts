import { IPatient } from "../../domain/entities/Patient";
import IPatientRepository from "../../interface/repositories/IPatientRepository";
import { IPasswordServiceRepository } from "../../interface/services/IPasswordServiceRepository";

export default class LoginPatientUseCase {
   constructor(
      private patientRepository: IPatientRepository,
      private passwordService: IPasswordServiceRepository
   ) {}

   async execute(patient: IPatient): Promise<IPatient> {
      const existingPatient = await this.patientRepository.findByEmailWithPassword(patient.email!);
      if (!existingPatient) throw new Error("User Not Found");

      const isPasswordValid = await this.passwordService.compare(patient.password!, existingPatient.password!);
      if (!isPasswordValid) throw new Error("Invalid Credentials");

      const { password, ...patientWithoutPassword } = existingPatient;
      return patientWithoutPassword as IPatient;
   }
}
