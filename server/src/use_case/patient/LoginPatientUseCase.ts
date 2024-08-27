import { IPatient } from "../../domain/entities/Patient";
import IPatientRepository from "../../interface/repositories/IPatientRepository";
import IEmailService from "../../interface/services/IEmailService";
import { IPasswordServiceRepository } from "../../interface/services/IPasswordServiceRepository";


export default class LoginPatientUseCase {
   constructor(
      private patientRepository: IPatientRepository,
      private passwordService: IPasswordServiceRepository,
      private emailService: IEmailService
   ) {}

   async execute(patient: IPatient): Promise<{ email: string } | null> {
      const existingPatient = await this.patientRepository.findByEmailWithPassword(patient.email!);
      if (!existingPatient) throw new Error("User Not Found");

      const isPasswordValid = await this.passwordService.compare(patient.password!, existingPatient.password!);
      if (!isPasswordValid) throw new Error("Invalid Credentials");

      await this.emailService.sendOtp(existingPatient.email!,existingPatient.name!,1234123);

      return { email: existingPatient.email! };
   }
}