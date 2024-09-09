import IDoctorRepository from "../../domain/interface/repositories/IDoctorRepository";
import IOtpRepository from "../../domain/interface/repositories/IOtpRepository";
import IEmailService from "../../domain/interface/services/IEmailService";
import { IPasswordServiceRepository } from "../../domain/interface/services/IPasswordServiceRepository";
import ITokenService from "../../domain/interface/services/ITokenService";
import { generateOTP } from "../../utils";
export default class AuthenticationUseCase {
   constructor(
      private adminRepository: IDoctorRepository,
      private passwordService: IPasswordServiceRepository,
      private tokenService: ITokenService,
      private emailService: IEmailService,
      private otpRepository: IOtpRepository
   ) {}

   async login(email: string, password: string): Promise<void> {
      const doctor = await this.adminRepository.findByEmailWithCredentials(email);
      if (!doctor) throw new Error("Invalid Credentials");
      if(doctor?.role!=='doctor') throw new Error("Invalid Credentials");
      if (!(await this.passwordService.compare(password, doctor.password!))) throw new Error("Invalid Credentials");

      let otp = parseInt(generateOTP(6), 10);
      while (otp.toString().length !== 6) {
         otp = parseInt(generateOTP(6), 10);
      }
      await this.emailService.sendOtp(email, "Admin", otp);
      
      await this.otpRepository.create(otp, email);
   }

   async validateOtp(email: string, otp: number): Promise<{ accessToken: string; refreshToken: string }> {
      const requestedOtp = await this.otpRepository.findOne(otp, email);
      if (!requestedOtp) throw new Error("Invalid Credentials");

      const admin = await this.adminRepository.findByEmailWithCredentials(email);
      if (!admin) throw new Error("Not Found");

      const accessToken = this.tokenService.createAccessToken(email, admin._id!);
      const refreshToken = this.tokenService.createRefreshToken(email, admin._id!);

      admin!.token = refreshToken;
      await this.adminRepository.update(admin);
      await this.otpRepository.deleteMany(email);

      return { accessToken, refreshToken };
   }

   async resendOtp(email: string) {
      const admin = await this.adminRepository.findByEmail(email);
      if (!admin) throw new Error("Not Found");

      let otp = parseInt(generateOTP(6), 10);
      while (otp.toString().length !== 6) {
         otp = parseInt(generateOTP(6), 10);
      }

      await this.otpRepository.create(otp, email);
      await this.emailService.sendOtp(email, "Admin", otp);
   }

   async refreshAccessToken(token: string): Promise<{ accessToken: string }> {
         const { email } = this.tokenService.verifyRefreshToken(token);
   
         const admin = await this.adminRepository.findByEmail(email);
         if (!admin) {
            throw new Error("Unauthorized");
         }
         const accessToken = this.tokenService.createAccessToken(admin.email!, admin._id!);
   
         return { accessToken };
   }
}
