import { IPasswordServiceRepository } from "@/domain/interface/services/IPasswordServiceRepository";
import ICloudStorageService from "@/domain/interface/services/ICloudStorageService";
import IDoctorRepository from "@/domain/interface/repositories/IDoctorRepository";
import IValidatorService from "@/domain/interface/services/IValidatorService";
import IOtpRepository from "@/domain/interface/repositories/IOtpRepository";
import IEmailService from "@/domain/interface/services/IEmailService";
import ITokenService from "@/domain/interface/services/ITokenService";
import { AWS_REGION, CLIENT_URL, S3_BUCKET_NAME } from "@/config/env";
import CustomError from "@/domain/entities/CustomError";
import IDoctor from "@/domain/entities/IDoctor";
import { StatusCode, UserRole } from "@/types";

export default class AuthenticationUseCase {
   constructor(
      private doctorRepository: IDoctorRepository,
      private passwordService: IPasswordServiceRepository,
      private tokenService: ITokenService,
      private emailService: IEmailService,
      private otpRepository: IOtpRepository,
      private cloudService: ICloudStorageService,
      private validatorService: IValidatorService
   ) {}

   async signin(email: string, password: string): Promise<void> {
      this.validatorService.validateEmailFormat(email);
      this.validatorService.validatePassword(password);
      const doctor = await this.doctorRepository.findByEmailWithCredentials(email);
      if (!doctor) throw new CustomError("Not Found", StatusCode.NotFound);
      if (doctor.isBlocked) throw new CustomError("Doctor is Blocked", StatusCode.Forbidden);
      if (doctor.role !== "doctor") throw new CustomError("Invalid Credentials", StatusCode.Unauthorized);
      if (!(await this.passwordService.compare(password, doctor.password!)))
         throw new CustomError("Invalid Credentials", StatusCode.Unauthorized);
      if (!doctor.isVerified) throw new CustomError("Not Verified", StatusCode.Unauthorized);

      let otp;
      if (email === "demodoctor@gmail.com") {
         otp = 777777;
      } else {
         otp = +this.generateOTP(6);
         while (otp.toString().length !== 6) {
            otp = +this.generateOTP(6);
         }
         await this.emailService.sendMail({
            email,
            name: doctor.name!,
            otp,
            pathOfTemplate: "@/../public/otpEmailTemplate.html",
            subject: "No Reply Mail: Otp Verification",
         });
      }

      await this.otpRepository.create(otp, email);
   }

   async validateOtp(email: string, otp: number): Promise<{ accessToken: string; refreshToken: string }> {
      this.validatorService.validateEmailFormat(email);
      const isOtp = await this.otpRepository.findOne(otp, email);
      if (!isOtp) throw new CustomError("Invalid Credentials", StatusCode.Unauthorized);

      const doctor = await this.doctorRepository.findByEmailWithCredentials(email)!;
      if (!doctor) throw new CustomError("Unauthorized", StatusCode.Unauthorized);

      const refreshToken = this.tokenService.createRefreshToken(doctor?.email!, doctor?._id!);
      const accessToken = this.tokenService.createAccessToken(doctor?.email!, doctor?._id!, UserRole.Doctor);

      doctor!.token = refreshToken;

      await this.doctorRepository.update(doctor._id!, doctor!);

      await this.otpRepository.deleteMany(email);

      return { accessToken, refreshToken };
   }

   async resendOtp(email: string) {
      this.validatorService.validateEmailFormat(email);
      const doctor = await this.doctorRepository.findByEmail(email);
      if (!doctor) throw new CustomError("Invalid Credentials", StatusCode.Unauthorized);

      let otp = +this.generateOTP(6);
      while (otp.toString().length !== 6) {
         otp = +this.generateOTP(6);
      }
      await this.emailService.sendMail({
         email,
         name: doctor.name!,
         otp,
         pathOfTemplate: "@/../public/otpEmailTemplate.html",
         subject: "No Reply Mail: Otp Verification",
      });

      await this.otpRepository.create(otp, email);
   }

   async sendForgotPasswordMail(email: string): Promise<void> {
      this.validatorService.validateEmailFormat(email);
      const doctor = await this.doctorRepository.findByEmail(email);
      if (!doctor) throw new CustomError("Invalid Credentials", StatusCode.Unauthorized);
      if (doctor.isBlocked) throw new CustomError("Doctor is Blocked", StatusCode.Forbidden);
      await this.emailService.sendMail({
         email,
         name: doctor.name!,
         pathOfTemplate: "@/../public/resetPasswordTemplate.html",
         subject: "No Reply Mail: Password Reset",
         link: `${CLIENT_URL}/doctor/reset-password`,
      });
   }

   async updatePassword(email: string, password: string): Promise<void> {
      this.validatorService.validateEmailFormat(email);
      this.validatorService.validatePassword(password);
      const doctor = await this.doctorRepository.findByEmail(email);
      if (!doctor) throw new CustomError("Invalid Credentials", StatusCode.Unauthorized);
      if (doctor.isBlocked) throw new CustomError("Doctor is Blocked", StatusCode.Forbidden);

      doctor.password = await this.passwordService.hash(password);
      await this.doctorRepository.update(doctor._id!, doctor!);
   }

   async register(doctor: IDoctor): Promise<string> {
      this.validatorService.validateRequiredFields({
         email: doctor.email,
         name: doctor.name,
         password: doctor.password,
         phone: doctor.phone,
         qualification: doctor.qualifications,
      });
      this.validatorService.validatePassword(doctor.password!);
      this.validatorService.validateEmailFormat(doctor.email!);
      this.validatorService.validatePhoneNumber(doctor.phone!);
      doctor.password = await this.passwordService.hash(doctor.password!);
      const createdDoctor = await this.doctorRepository.create(doctor);
      return createdDoctor._id!;
   }

   async getPreSignedUrl(id: string): Promise<{ url: string; key: string }> {
      this.validatorService.validateIdFormat(id);
      const doctor = await this.doctorRepository.findById(id);
      if (!doctor) throw new CustomError("Not Found", StatusCode.NotFound);
      const key = `profile-images/doctor/${id}-${Date.now()}`;
      const url = await this.cloudService.generatePreSignedUrl(S3_BUCKET_NAME!, key, 30);
      return { url, key };
   }

   async updateProfileImage(key: string, id: string): Promise<void> {
      this.validatorService.validateIdFormat(id);
      const doctor = await this.doctorRepository.findById(id);
      if (!doctor) throw new CustomError("Not Found", StatusCode.NotFound);
      if (doctor.isBlocked) throw new CustomError("Doctor is Blocked", StatusCode.Forbidden);

      if (doctor.image) {
         await this.cloudService.deleteFile(S3_BUCKET_NAME!, doctor.image.split("amazonaws.com/").pop()!);
      }
      const imageUrl = `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`;
      doctor.image = imageUrl;
      await this.doctorRepository.update(doctor._id!, doctor!);
   }

   async refresh(token: string): Promise<{ accessToken: string }> {
      const { id } = this.tokenService.verifyRefreshToken(token);
      const doctor = await this.doctorRepository.findById(id);
      if (!doctor) throw new CustomError("Unauthorized", StatusCode.Unauthorized);

      if (doctor.isBlocked) throw new CustomError("Doctor is Blocked", StatusCode.Forbidden);

      const accessToken = this.tokenService.createAccessToken(doctor.email!, doctor._id!, UserRole.Doctor);

      return { accessToken };
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
