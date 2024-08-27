import { IPatient } from "../../domain/entities/Patient";
import IOtpRepository from "../../interface/repositories/IOtpRepository";
import IPatientRepository from "../../interface/repositories/IPatientRepository";
import IEmailService from "../../interface/services/IEmailService";
import { IPasswordServiceRepository } from "../../interface/services/IPasswordServiceRepository";
import { generateOTP } from "../../utils";

export default class LoginPatientUseCase {
   constructor(
      private patientRepository: IPatientRepository,
      private passwordService: IPasswordServiceRepository,
      private emailService: IEmailService,
      private otpRepository: IOtpRepository
   ) {}

   async execute(patient: IPatient): Promise<{ email: string } | null> {
      const existingPatient = await this.patientRepository.findByEmailWithPassword(patient.email!);
      if (!existingPatient) throw new Error("User Not Found");

      const isPasswordValid = await this.passwordService.compare(patient.password!, existingPatient.password!);
      if (!isPasswordValid) throw new Error("Invalid Credentials");

      const otp = generateOTP(6);
      await this.otpRepository.create(otp, existingPatient.email!);

      await this.emailService.sendOtp(existingPatient.email!, existingPatient.name!, otp);

      return { email: existingPatient.email! };
   }

   async validateOtp(otp: number, email: string): Promise<IPatient> {
      const isOtp = await this.otpRepository.findOne(otp, email);
      if (!isOtp) throw Error("Invalid Otp");

      const patient = await this.patientRepository.findByEmail(email);

      patient!.token = '2dfjlaasdfsadfa'

      return patient!
   }
}
