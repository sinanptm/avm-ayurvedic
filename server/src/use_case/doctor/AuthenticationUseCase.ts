import IDoctorRepository from "../../domain/interface/repositories/IDoctorRepository";
import IOtpRepository from "../../domain/interface/repositories/IOtpRepository";
import IEmailService from "../../domain/interface/services/IEmailService";
import { IPasswordServiceRepository } from "../../domain/interface/services/IPasswordServiceRepository";
import ITokenService from "../../domain/interface/services/ITokenService";
import { generateOTP } from "../../utils";

export default class AuthenticationUseCase {
   constructor(
      private doctorRepository: IDoctorRepository,
      private passwordService: IPasswordServiceRepository,
      private tokenService: ITokenService,
      private emailService: IEmailService,
      private otpRepository: IOtpRepository
   ) {}

   async signin(email: string, password: string): Promise<void> {
      const doctor = await this.doctorRepository.findByEmailWithCredentials(email);
      if (!doctor) throw new Error("Doctor Not Found");
      if (doctor.isBlocked) throw new Error("Doctor is Blocked");
      if (doctor.role !== "doctor") throw new Error("Invalid Credentials");

      if (!doctor.password?.trim()) throw new Error("Not Verified");
      if (!(await this.passwordService.compare(password, doctor.password!))) throw new Error("Invalid Credentials");

      let otp = parseInt(generateOTP(6), 10);
      while (otp.toString().length !== 6) {
         otp = parseInt(generateOTP(6), 10);
      }

      await this.emailService.sendOtp(email, doctor.name!, otp);

      await this.otpRepository.create(otp, email);
   }
}
