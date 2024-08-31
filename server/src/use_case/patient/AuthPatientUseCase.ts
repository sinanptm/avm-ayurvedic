import { IPatient } from "../../domain/entities/Patient";
import IOtpRepository from "../../interface/repositories/IOtpRepository";
import IPatientRepository from "../../interface/repositories/IPatientRepository";
import IEmailService from "../../interface/services/IEmailService";
import { IPasswordServiceRepository } from "../../interface/services/IPasswordServiceRepository";
import ITokenService from "../../interface/services/ITokenService";
import { generateOTP } from "../../utils";

export default class LoginPatientUseCase {
   constructor(
      private patientRepository: IPatientRepository,
      private passwordService: IPasswordServiceRepository,
      private emailService: IEmailService,
      private otpRepository: IOtpRepository,
      private tokenService: ITokenService
   ) {}

   async login(patient: IPatient): Promise<{ email: string } | null> {
      const foundedPatient = await this.patientRepository.findByEmailWithPassword(patient.email!);
      if (!foundedPatient) throw new Error("Patient Not Found");

      const isPasswordValid = await this.passwordService.compare(patient.password!, foundedPatient.password!);
      if (!isPasswordValid) throw new Error("Invalid Credentials");

      if (foundedPatient.isBlocked) throw new Error("Unauthorized");

      let otp = parseInt(generateOTP(6),10);
      while (otp.toString().length !== 6) {
         otp = parseInt(generateOTP(6),10);
      }
      await this.otpRepository.create(otp, foundedPatient.email!);

      await this.emailService.sendOtp(foundedPatient.email!, foundedPatient.name!, otp);

      return { email: foundedPatient.email! };
   }

   async resendOtp(email: string): Promise<void> {
      const patient = await this.patientRepository.findByEmail(email);
      if (!patient) throw new Error("Patient Not Found");

      let otp = parseInt(generateOTP(6),10);
      while (otp.toString().length !== 6) {
         otp = parseInt(generateOTP(6),10);
      }
      await this.otpRepository.create(otp, email);
      await this.emailService.sendOtp(email, patient.name!, otp);
   }

   async validateOtp(otp: number, email: string): Promise<{ accessToken: string; refreshToken: string }> {
      const isOtp = await this.otpRepository.findOne(otp, email);
      if (!isOtp) throw Error("Invalid Otp");

      const patient = await this.patientRepository.findByEmail(email)!;
      if (patient && patient?.isBlocked) throw new Error("Unauthorized");

      const refreshToken = this.tokenService.createRefreshToken(patient?.email!, patient?._id!);
      const accessToken = this.tokenService.createAccessToken(patient?.email!, patient?._id!);

      patient!.token = refreshToken;

      await this.patientRepository.update(patient!);

      await this.otpRepository.deleteMany(otp, email);

      return { accessToken, refreshToken };
   }

   async refreshAccessToken(token: string): Promise<{ accessToken: string }> {
      const { id } = this.tokenService.verifyRefreshToken(token);

      const patient = await this.patientRepository.findById(id);
      if (!patient) throw new Error("Unauthorized");

      if (patient.isBlocked) throw new Error("Patient is blocked");

      const accessToken = this.tokenService.createAccessToken(patient.email!, patient._id!);

      return { accessToken };
   }
}