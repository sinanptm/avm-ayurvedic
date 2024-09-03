import IDoctorRepository from "../../interface/repositories/IDoctorRepository";
import { IPasswordServiceRepository } from "../../interface/services/IPasswordServiceRepository";
import ITokenService from "../../interface/services/ITokenService";

export default class AuthenticationUseCase {
   constructor(
      private doctorRepository: IDoctorRepository,
      private passwordService: IPasswordServiceRepository,
      private tokenService: ITokenService
   ) {}

   async login(email: string, password: string): Promise<{ accessToken: string; refreshToken: string }> {
      const doctor = await this.doctorRepository.findByEmail(email);
      if (!doctor) throw new Error("Doctor Not Found");
      if (!(await this.passwordService.compare(password, doctor.password!))) throw new Error("Invalid Credentials");
      const accessToken = this.tokenService.createAccessToken(doctor.email!, doctor._id!);
      const refreshToken = this.tokenService.createRefreshToken(doctor.email!, doctor._id!);
      doctor.token = refreshToken;
      await this.doctorRepository.findByIdAndUpdate(doctor);
      return { accessToken, refreshToken };
   }
}
