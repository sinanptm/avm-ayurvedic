import { IPasswordServiceRepository } from "../../domain/interface/services/IPasswordServiceRepository";
import IPatientRepository from "../../domain/interface/repositories/IPatientRepository";
import IValidatorService from "../../domain/interface/services/IValidatorService";
import IOtpRepository from "../../domain/interface/repositories/IOtpRepository";
import ITokenService from "../../domain/interface/services/ITokenService";
import IEmailService from "../../domain/interface/services/IEmailService";
import CustomError from "../../domain/entities/CustomError";
import IPatient  from "../../domain/entities/IPatient";
import { StatusCode, UserRole } from "../../types";
import { CLIENT_URL } from "../../config/env";

type TokensResponse = {
   accessToken: string;
   refreshToken: string;
};

export default class AuthenticationUseCase {
   constructor(
      private patientRepository: IPatientRepository,
      private passwordService: IPasswordServiceRepository,
      private emailService: IEmailService,
      private otpRepository: IOtpRepository,
      private tokenService: ITokenService,
      private validatorService: IValidatorService
   ) {}

   async register(patient: IPatient): Promise<string> {
      this.validatorService.validateRequiredFields({
         email: patient.email,
         password: patient.password,
         name: patient.name,
         phone: patient.phone,
      });
      this.validatorService.validateEmailFormat(patient.email!);
      this.validatorService.validatePassword(patient.password!);
      this.validatorService.validateLength(patient.name!, 3, 20);
      this.validatorService.validatePhoneNumber(patient.phone!);

      patient.password = await this.passwordService.hash(patient.password!);
      const { _id } = await this.patientRepository.create(patient);
      return `Patient created successfully with ID ${_id}`;
   }

   async login(patient: IPatient): Promise<{ email: string }> {
      this.validatorService.validateEmailFormat(patient.email!);
      this.validatorService.validatePassword(patient.password!);

      const foundPatient = await this.patientRepository.findByEmailWithCredentials(patient.email!);
      if (!foundPatient) throw new CustomError("Invalid email or password", StatusCode.Unauthorized);

      if (!foundPatient.password)
         throw new CustomError("Account requires alternative login methods", StatusCode.Unauthorized);
      if (foundPatient.isBlocked) throw new CustomError("Account is blocked", StatusCode.Forbidden);

      const isPasswordValid = await this.passwordService.compare(patient.password!, foundPatient.password!);
      if (!isPasswordValid) throw new CustomError("Invalid email or password", StatusCode.Unauthorized);

      const otp = +this.generateOTP(6);
      await this.otpRepository.create(otp, foundPatient.email!);

      await this.emailService.sendMail({
         email: foundPatient.email!,
         name: foundPatient.name!,
         otp,
         pathOfTemplate: "../../../public/otpEmailTemplate.html",
         subject: "OTP Verification",
      });

      return { email: foundPatient.email! };
   }

   async oAuthSignin(email: string, name: string, profile?: string): Promise<TokensResponse> {
      this.validatorService.validateEmailFormat(email);
      this.validatorService.validateLength(name, 3, 20);

      let patient = await this.patientRepository.findByEmail(email);
      if (!patient) {
         patient = await this.patientRepository.create({ email, name, profile } as IPatient);
      }
      if (patient.isBlocked) throw new CustomError("Account is blocked", StatusCode.Forbidden);

      const accessToken = this.tokenService.createAccessToken(email, patient._id!, UserRole.Patient);
      const refreshToken = this.tokenService.createRefreshToken(email, patient._id!);

      return { accessToken, refreshToken };
   }

   async resendOtp(email: string): Promise<void> {
      this.validatorService.validateEmailFormat(email);

      const patient = await this.patientRepository.findByEmail(email);
      if (!patient) throw new CustomError("Invalid email address", StatusCode.Unauthorized);

      const otp = +this.generateOTP(6);
      await this.emailService.sendMail({
         email,
         name: patient.name!,
         otp,
         pathOfTemplate: "../../../public/otpEmailTemplate.html",
         subject: "OTP Verification",
      });

      await this.otpRepository.create(otp, email);
   }

   async validateOtp(otp: number, email: string): Promise<TokensResponse> {
      this.validatorService.validateEmailFormat(email);

      const isOtpValid = await this.otpRepository.findOne(otp, email);
      if (!isOtpValid) throw new CustomError("Invalid OTP", StatusCode.Unauthorized);

      const patient = await this.patientRepository.findByEmailWithCredentials(email);
      if (!patient || patient.isBlocked) throw new CustomError("Unauthorized", StatusCode.Forbidden);

      const refreshToken = this.tokenService.createRefreshToken(patient.email!, patient._id!);
      const accessToken = this.tokenService.createAccessToken(patient.email!, patient._id!, UserRole.Patient);

      patient.token = refreshToken;
      await this.patientRepository.update(patient._id!, patient!);

      await this.otpRepository.deleteMany(email);

      return { accessToken, refreshToken };
   }

   async refreshAccessToken(token: string): Promise<{ accessToken: string }> {
      const { id } = this.tokenService.verifyRefreshToken(token);

      const patient = await this.patientRepository.findById(id);
      if (!patient) throw new CustomError("Unauthorized", StatusCode.Unauthorized);
      if (patient.isBlocked) throw new CustomError("Account is blocked", StatusCode.Forbidden);

      const accessToken = this.tokenService.createAccessToken(patient.email!, patient._id!, UserRole.Patient);

      return { accessToken };
   }

   async sendForgetPasswordMail(email: string): Promise<void> {
      this.validatorService.validateEmailFormat(email);

      const patient = await this.patientRepository.findByEmail(email);
      if (!patient) throw new CustomError("Invalid email address", StatusCode.Unauthorized);
      if (patient.isBlocked) throw new CustomError("Account is blocked", StatusCode.Forbidden);

      await this.emailService.sendMail({
         email,
         name: patient.name!,
         pathOfTemplate: "../../../public/resetPasswordTemplate.html",
         subject: "Password Reset",
         link: `${CLIENT_URL}/signin/reset-password`,
      });
   }

   async updatePatientPassword(email: string, newPassword: string): Promise<void> {
      this.validatorService.validateEmailFormat(email);
      this.validatorService.validatePassword(newPassword);

      const patient = await this.patientRepository.findByEmailWithCredentials(email);
      if (!patient) throw new CustomError("Invalid email address", StatusCode.Unauthorized);
      if (patient.isBlocked) throw new CustomError("Account is blocked", StatusCode.Forbidden);

      patient.password = await this.passwordService.hash(newPassword);
      await this.patientRepository.update(patient._id!, patient!);
   }

   private generateOTP(length: number): string {
      let otp = "";
      const digits = "0123456789";

      for (let i = 0; i < length; i++) {
         otp += digits[Math.floor(Math.random() * 10)];
      }

      return otp;
   }
}
