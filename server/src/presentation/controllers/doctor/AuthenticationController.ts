import { NextFunction, Request, Response } from "express";
import AuthenticationUseCase from "../../../use_case/doctor/AuthenticationUseCase";
import { Cookie, StatusCode } from "../../../types";
import IDoctor from "../../../domain/entities/IDoctor";
import { isValidatePassword, isValidEmail } from "../../validators/authValidators";

export default class AuthDoctorController {
   constructor(private authDoctorUseCase: AuthenticationUseCase) {}

   async signin(req: Request, res: Response, next: NextFunction) {
      try {
         const { email, password } = req.body;

         if (!email.trim()) {
            return res.status(StatusCode.BadRequest).json({ message: "Email is required" });
         }
         if (!password.trim()) {
            return res.status(StatusCode.BadRequest).json({ message: "Password is required" });
         }

         await this.authDoctorUseCase.signin(email, password);
         res.status(StatusCode.Success).json({ message: "OTP has been sent to your email" });
      } catch (error: any) {
         next(error);
      }
   }
   async validateOtp(req: Request, res: Response, next: NextFunction) {
      try {
         const { otp, email } = req.body;
         if (!otp) return res.status(StatusCode.BadRequest).json({ message: "OTP is required" });
         if (!email) return res.status(StatusCode.BadRequest).json({ message: "Email is required" });

         const { accessToken, refreshToken } = await this.authDoctorUseCase.validateOtp(email, otp);

         res.cookie(Cookie.Doctor, refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
         });

         return res.status(StatusCode.Success).json({ accessToken });
      } catch (error) {
         next(error);
      }
   }

   async resendOtp(req: Request, res: Response, next: NextFunction) {
      try {
         const { email } = req.body;
         if (!email) return res.status(StatusCode.BadRequest).json({ message: "Email is Required" });
         await this.authDoctorUseCase.resendOtp(email);
         res.status(StatusCode.Success).json({ message: "Otp Has Sended to email Address" });
      } catch (error) {
         next(error);
      }
   }

   async forgotPassword(req: Request, res: Response, next: NextFunction) {
      try {
         const { email } = req.body;
         if (!email) return res.status(StatusCode.BadRequest).json({ message: "Email is Required" });
         await this.authDoctorUseCase.sendForgotPasswordMail(email);

         res.status(StatusCode.Success).json({ message: "Instruction has sended to email" });
      } catch (error) {
         next(error);
      }
   }
   async updatePassword(req: Request, res: Response, next: NextFunction) {
      try {
         const { email, password } = req.body;

         if (!email) return res.status(StatusCode.BadRequest).json({ message: "Email is required" });
         if (!password?.trim()) {
            return res.status(StatusCode.BadRequest).json({ message: "password is required" });
         }
         if (!isValidatePassword(password)) {
            return res.status(StatusCode.UnprocessableEntity).json({ message: "Password is too weak" });
         }

         await this.authDoctorUseCase.updatePassword(email, password);
         res.status(StatusCode.Success).json({ message: "Password has updated" });
      } catch (error) {
         next(error);
      }
   }

   async signup(req: Request, res: Response, next: NextFunction) {
      try {
         const doctor: IDoctor = req.body;

         if (!doctor.email?.trim()) {
            return res.status(StatusCode.BadRequest).json({ message: "Email is required" });
         }
         if (!isValidEmail(doctor.email)) {
            return res.status(StatusCode.UnprocessableEntity).json({ message: "Invalid email format" });
         }
         if (!doctor.password?.trim()) {
            return res.status(StatusCode.BadRequest).json({ message: "Password is required" });
         }
         if (!isValidatePassword(doctor.password)) {
            return res.status(StatusCode.UnprocessableEntity).json({ message: "Password is too weak" });
         }
         if (!doctor.name?.trim()) {
            return res.status(StatusCode.BadRequest).json({ message: "Name is required" });
         }
         if (!doctor.phone?.toString().trim()) {
            return res.status(StatusCode.BadRequest).json({ message: "Phone number is required" });
         }
         if (!doctor.qualifications || doctor.qualifications?.length < 1) {
            return res.status(StatusCode.BadRequest).json({ message: "Qualifications is required" });
         }

         const id = await this.authDoctorUseCase.register(doctor);
         res.status(StatusCode.Success).json({ message: "Signup successful", id });
      } catch (error: any) {
         next(error);
      }
   }

   async getUploadUrl(req: Request, res: Response, next: NextFunction) {
      try {
         const id = req.query.id;
         if (!id) return res.status(StatusCode.BadRequest).json({ message: "Id is Required" });

         const { url, key } = await this.authDoctorUseCase.getPreSignedUrl(id.toString());

         res.status(StatusCode.Success).json({ url, key });
      } catch (error) {
         next(error);
      }
   }
   async uploadProfileImage(req: Request, res: Response, next: NextFunction) {
      try {
         const { key, id } = req.body;
         if (!id.trim() || !key.trim())
            return res.status(StatusCode.BadRequest).json({ message: "Id and Key is Required" });
         await this.authDoctorUseCase.updateProfileImage(key, id);
         res.status(StatusCode.Success).json({ message: "Profile image updated successfully" });
      } catch (error) {
         next(error);
      }
   }

   async refreshAccessToken(req: Request, res: Response, next: NextFunction) {
      try {
         const { doctorToken } = req.cookies;
         if (!doctorToken) return res.status(StatusCode.Forbidden).json({ message: "Unauthorized" });
         const { accessToken } = await this.authDoctorUseCase.refresh(doctorToken);
         res.status(StatusCode.Success).json({ accessToken });
      } catch (error) {
         next(error);
      }
   }

   async logout(req: Request, res: Response, next: NextFunction) {
      try {
         const { doctorToken } = req.cookies;
         if (!doctorToken) return res.status(StatusCode.Forbidden).json({ message: "Unauthorized" });
         res.clearCookie(Cookie.Doctor, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
         });

         return res.status(StatusCode.Success).json({ message: "Cookie cleared" });
      } catch (error) {
         next(error);
      }
   }
}
