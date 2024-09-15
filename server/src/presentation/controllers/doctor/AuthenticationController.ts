import { NextFunction, Request, Response } from "express";
import AuthenticationUseCase from "../../../use_case/doctor/AuthenticationUseCase";
import { Cookie, StatusCode } from "../../../types";
import IDoctor from "../../../domain/entities/IDoctor";

export default class AuthDoctorController {
   constructor(private authDoctorUseCase: AuthenticationUseCase) {}

   async signin(req: Request, res: Response, next: NextFunction) {
      try {
         const { email, password } = req.body;
         await this.authDoctorUseCase.signin(email, password);
         res.status(StatusCode.Success).json({ message: "OTP has been sent to your email" });
      } catch (error: any) {
         next(error);
      }
   }
   async validateOtp(req: Request, res: Response, next: NextFunction) {
      try {
         const { otp, email } = req.body;
        
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
         await this.authDoctorUseCase.resendOtp(email);
         res.status(StatusCode.Success).json({ message: "Otp Has Sended to email Address" });
      } catch (error) {
         next(error);
      }
   }

   async forgotPassword(req: Request, res: Response, next: NextFunction) {
      try {
         const { email } = req.body;
         await this.authDoctorUseCase.sendForgotPasswordMail(email);

         res.status(StatusCode.Success).json({ message: "Instruction has sended to email" });
      } catch (error) {
         next(error);
      }
   }
   async updatePassword(req: Request, res: Response, next: NextFunction) {
      try {
         const { email, password } = req.body;

         await this.authDoctorUseCase.updatePassword(email, password);
         res.status(StatusCode.Success).json({ message: "Password has updated" });
      } catch (error) {
         next(error);
      }
   }

   async signup(req: Request, res: Response, next: NextFunction) {
      try {
         const doctor: IDoctor = req.body;
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
