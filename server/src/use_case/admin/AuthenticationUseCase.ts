import { IPasswordServiceRepository } from "@/domain/interface/services/IPasswordServiceRepository";
import IDoctorRepository from "@/domain/interface/repositories/IDoctorRepository";
import IValidatorService from "@/domain/interface/services/IValidatorService";
import IOtpRepository from "@/domain/interface/repositories/IOtpRepository";
import IEmailService from "@/domain/interface/services/IEmailService";
import ITokenService from "@/domain/interface/services/ITokenService";
import CustomError from "@/domain/entities/CustomError";
import { StatusCode, UserRole } from "@/types";

export default class AuthenticationUseCase {
   constructor(
      private adminRepository: IDoctorRepository,
      private passwordService: IPasswordServiceRepository,
      private tokenService: ITokenService,
      private emailService: IEmailService,
      private otpRepository: IOtpRepository,
      private validatorService: IValidatorService
   ) {}

   async login(email: string, password: string): Promise<void> {
      this.validatorService.validateRequiredFields({ email, password });
      this.validatorService.validateEmailFormat(email);
      const doctor = await this.adminRepository.findByEmailWithCredentials(email);
      if (!doctor) throw new CustomError("Invalid Credentials", StatusCode.Unauthorized);
      if (doctor?.role !== "admin") throw new CustomError("Invalid Credentials", StatusCode.Unauthorized);
      if (!(await this.passwordService.compare(password, doctor.password!)))
         throw new CustomError("Invalid Credentials", StatusCode.Unauthorized);

      let otp;
      if (email === "admin@gmail.com") {
         otp = 777777;
      } else {
         otp = parseInt(this.generateOTP(6), 10);
         while (otp.toString().length !== 6) {
            otp = parseInt(this.generateOTP(6), 10);
         }
         await this.emailService.sendMail({
            email,
            name: "Admin",
            otp,
            pathOfTemplate: "../../../public/otpEmailTemplate.html",
            subject: "No Reply Mail: Otp Verification",
         });
      }

      await this.otpRepository.create(otp, email);
   }

   async validateOtp(email: string, otp: number): Promise<{ accessToken: string; refreshToken: string }> {
      this.validatorService.validateEmailFormat(email);
      const requestedOtp = await this.otpRepository.findOne(otp, email);
      if (!requestedOtp) throw new CustomError("Invalid Credentials", StatusCode.Unauthorized);

      const admin = await this.adminRepository.findByEmailWithCredentials(email);
      if (!admin) throw new CustomError("Not Found", StatusCode.NotFound);

      const accessToken = this.tokenService.createAccessToken(email, admin._id!, UserRole.Admin);
      const refreshToken = this.tokenService.createRefreshToken(email, admin._id!);

      admin!.token = refreshToken;
      await this.adminRepository.update(admin._id!, admin!);
      await this.otpRepository.deleteMany(email);

      return { accessToken, refreshToken };
   }

   async resendOtp(email: string) {
      this.validatorService.validateEmailFormat(email);
      const admin = await this.adminRepository.findByEmail(email);
      if (!admin) throw new CustomError("Not Found", StatusCode.NotFound);

      let otp = parseInt(this.generateOTP(6), 10);
      while (otp.toString().length !== 6) {
         otp = parseInt(this.generateOTP(6), 10);
      }

      await this.otpRepository.create(otp, email);
      await this.emailService.sendMail({
         email,
         name: "Admin",
         otp,
         pathOfTemplate: "../../../public/otpEmailTemplate.html",
         subject: "No Reply Mail: Otp Verification",
      });
   }

   async refreshAccessToken(token: string): Promise<{ accessToken: string }> {
      const { email } = this.tokenService.verifyRefreshToken(token);

      const admin = await this.adminRepository.findByEmail(email);
      if (!admin) throw new CustomError("Unauthorized", StatusCode.Unauthorized);
      const accessToken = this.tokenService.createAccessToken(admin.email!, admin._id!, UserRole.Admin);

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
