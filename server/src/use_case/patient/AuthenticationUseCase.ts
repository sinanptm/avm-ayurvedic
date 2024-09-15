import ITokenService from "../../domain/interface/services/ITokenService";
import IOtpRepository from "../../domain/interface/repositories/IOtpRepository";
import IPatientRepository from "../../domain/interface/repositories/IPatientRepository";
import IEmailService from "../../domain/interface/services/IEmailService";
import { IPatient } from "../../domain/entities/IPatient";
import { IPasswordServiceRepository } from "../../domain/interface/services/IPasswordServiceRepository";
import { UserRole } from "../../types";
import IValidatorService from "../../domain/interface/services/IValidatorService";

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
   ) { }

   async register(patient: IPatient) {
      this.validatorService.validateEmailFormat(patient.email!);
      this.validatorService.validatePassword(patient.password!);
      if (!patient.name?.trim()) throw new Error("Name is required");
      if (!patient.phone?.toString().trim()) throw new Error("Phone number is required");

      patient.password = await this.passwordService.hash(patient.password!);
      const { _id } = await this.patientRepository.create(patient);
      return `New Patient with id ${_id} Created`;
   }

   async login(patient: IPatient): Promise<{ email: string } | null> {
      this.validatorService.validateEmailFormat(patient.email!);
      if (!patient.password?.trim()) throw new Error("Password is required");

      const foundedPatient = await this.patientRepository.findByEmailWithCredentials(patient.email!);
      if (!foundedPatient) throw new Error("Invalid Credentials");

      if (!foundedPatient.password) throw new Error("Patient has no Password");

      if (foundedPatient.isBlocked) throw new Error("Patient is Blocked");

      const isPasswordValid = await this.passwordService.compare(patient.password!, foundedPatient.password!);
      if (!isPasswordValid) throw new Error("Invalid Credentials");

      let otp = +this.generateOTP(6);
      while (otp.toString().length !== 6) {
         otp = +this.generateOTP(6);
      }
      await this.otpRepository.create(otp, foundedPatient.email!);

      await this.emailService.sendMail({
         email: foundedPatient.email!,
         name: foundedPatient.name!,
         otp,
         pathOfTemplate: "../../../public/otpEmailTemplate.html",
         subject: "No Reply Mail: Otp Verification",
      });

      return { email: foundedPatient.email! };
   }

   async oAuthSignin(email: string, name: string, profile?: string): Promise<TokensResponse> {
      this.validatorService.validateEmailFormat(email);
      if (!name) throw new Error("Name is required");

      let patient = await this.patientRepository.findByEmail(email);
      if (!patient) {
         patient = await this.patientRepository.create({ email, name, profile } as IPatient);
      }
      if (patient.isBlocked) throw new Error("Patient is Blocked");

      let accessToken = this.tokenService.createAccessToken(email, patient._id!, UserRole.Patient);
      let refreshToken = this.tokenService.createRefreshToken(email, patient._id!);

      return { accessToken, refreshToken };
   }

   async resendOtp(email: string): Promise<void> {
      this.validatorService.validateEmailFormat(email);

      const patient = await this.patientRepository.findByEmail(email);
      if (!patient) throw new Error("Invalid Credentials");

      let otp = +this.generateOTP(6);
      while (otp.toString().length !== 6) {
         otp = +this.generateOTP(6);
      }
      await this.emailService.sendMail({
         email,
         name: patient.name!,
         otp,
         pathOfTemplate: "../../../public/otpEmailTemplate.html",
         subject: "No Reply Mail: Otp Verification",
      });

      await this.otpRepository.create(otp, email);
   }

   async validateOtp(otp: number, email: string): Promise<TokensResponse> {
      this.validatorService.validateEmailFormat(email);

      const isOtp = await this.otpRepository.findOne(otp, email);
      if (!isOtp) throw Error("Invalid Credentials");

      const patient = await this.patientRepository.findByEmailWithCredentials(email)!;
      if (patient && patient?.isBlocked) throw new Error("Unauthorized");

      const refreshToken = this.tokenService.createRefreshToken(patient?.email!, patient?._id!);
      const accessToken = this.tokenService.createAccessToken(patient?.email!, patient?._id!, UserRole.Patient);

      patient!.token = refreshToken;

      await this.patientRepository.update(patient!);

      await this.otpRepository.deleteMany(email);

      return { accessToken, refreshToken };
   }

   async refreshAccessToken(token: string): Promise<{ accessToken: string }> {
      const { id } = this.tokenService.verifyRefreshToken(token);

      const patient = await this.patientRepository.findById(id);
      if (!patient) throw new Error("Unauthorized");

      if (patient.isBlocked) throw new Error("Patient is Blocked");

      const accessToken = this.tokenService.createAccessToken(patient.email!, patient._id!, UserRole.Patient);

      return { accessToken };
   }

   async sendForgetPasswordMail(email: string): Promise<void> {
      this.validatorService.validateEmailFormat(email);

      const patient = await this.patientRepository.findByEmail(email);
      if (!patient) throw new Error("Invalid Credentials");
      if (patient.isBlocked) throw new Error("Patient is Blocked");

      await this.emailService.sendMail({
         email,
         name: patient.name!,
         pathOfTemplate: "../../../public/resetPasswordTemplate.html",
         subject: "No Reply Mail: Password Reset",
         link: `${process.env.CLIENT_URL}/signin/reset-password`,
      });
   }

   async updatePatientPassword(email: string, newPassword: string): Promise<void> {
      this.validatorService.validateEmailFormat(email);
      this.validatorService.validatePassword(newPassword);

      const patient = await this.patientRepository.findByEmailWithCredentials(email);
      if (!patient) throw new Error("Invalid Credentials");
      if (patient.isBlocked) throw new Error("Patient is Blocked");

      patient.password = await this.passwordService.hash(newPassword);

      await this.patientRepository.update(patient);
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
