import { IPatient } from "../../domain/entities/IPatient";
import IOtpRepository from "../../domain/interface/repositories/IOtpRepository";
import IPatientRepository from "../../domain/interface/repositories/IPatientRepository";
import IEmailService from "../../domain/interface/services/IEmailService";
import { IPasswordServiceRepository } from "../../domain/interface/services/IPasswordServiceRepository";
import ITokenService from "../../domain/interface/services/ITokenService";
import { generateOTP } from "../../utils";

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
      private tokenService: ITokenService
   ) {}

   async register(patient: IPatient) {
      patient.password = await this.passwordService.hash(patient.password!);
      const { _id } = await this.patientRepository.create(patient);
      return `New Patient with id ${_id} Created`;
   }

   async login(patient: IPatient): Promise<{ email: string } | null> {
      const foundedPatient = await this.patientRepository.findByEmailWithCredentials(patient.email!);
      if (!foundedPatient) throw new Error("Invalid Credentials");

      if (!foundedPatient.password) throw new Error("Patient has no Password");

      if (foundedPatient.isBlocked) {
         throw new Error("Patient is Blocked");
      }

      const isPasswordValid = await this.passwordService.compare(patient.password!, foundedPatient.password!);
      if (!isPasswordValid) throw new Error("Invalid Credentials");

      if (foundedPatient.isBlocked) throw new Error("Unauthorized");

      let otp = parseInt(generateOTP(6), 10);
      while (otp.toString().length !== 6) {
         otp = parseInt(generateOTP(6), 10);
      }
      await this.otpRepository.create(otp, foundedPatient.email!);

      await this.emailService.sendMail({
         email:foundedPatient.email!,
         name: foundedPatient.name!,
         otp,
         pathOfTemplate: "../../../public/otpEmailTemplate.html",
         subject: "No Reply Mail: Otp Verification",
      });

      return { email: foundedPatient.email! };
   }

   async oAuthSignin(email: string, name: string, profile?: string): Promise<TokensResponse> {
      let patient = await this.patientRepository.findByEmail(email);
      if (!patient) {
         patient = await this.patientRepository.create({ email, name, profile } as IPatient);
      }
      if (patient.isBlocked) {
         throw new Error("Patient is Blocked");
      }
      let accessToken = this.tokenService.createAccessToken(email, patient._id!);
      let refreshToken = this.tokenService.createRefreshToken(email, patient._id!);

      return { accessToken, refreshToken };
   }

   async resendOtp(email: string): Promise<void> {
      const patient = await this.patientRepository.findByEmail(email);
      if (!patient) throw new Error("Invalid Credentials");

      let otp = parseInt(generateOTP(6), 10);
      while (otp.toString().length !== 6) {
         otp = parseInt(generateOTP(6), 10);
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
      const isOtp = await this.otpRepository.findOne(otp, email);
      if (!isOtp) throw Error("Invalid Credentials");

      const patient = await this.patientRepository.findByEmailWithCredentials(email)!;
      if (patient && patient?.isBlocked) throw new Error("Unauthorized");

      const refreshToken = this.tokenService.createRefreshToken(patient?.email!, patient?._id!);
      const accessToken = this.tokenService.createAccessToken(patient?.email!, patient?._id!);

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

      const accessToken = this.tokenService.createAccessToken(patient.email!, patient._id!);

      return { accessToken };
   }

   async sendForgetPasswordMail(email: string): Promise<void> {
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
      const patient = await this.patientRepository.findByEmailWithCredentials(email);
      if (!patient) throw new Error("Invalid Credentials");
      if (patient.isBlocked) throw new Error("Patient is Blocked");

      patient.password = await this.passwordService.hash(newPassword);

      await this.patientRepository.update(patient);
   }
}
