import AuthenticationUseCase from "../../../use_case/patient/AuthenticationUseCase";
import { NextFunction, Request, Response } from "express";
import { Cookie, StatusCode } from "../../../types";

export default class AuthPatientController {
   constructor(private authUseCase: AuthenticationUseCase) {}

   async register(req: Request, res: Response, next: NextFunction) {
      try {
         const patient = req.body;
         const result = await this.authUseCase.register(patient);
         return res.status(StatusCode.Created).json({ message: result });
      } catch (error) {
         next(error);
      }
   }

   async login(req: Request, res: Response, next: NextFunction) {
      try {
         const patient = req.body;
         const patientDetails = await this.authUseCase.login(patient);
         return res.status(StatusCode.Success).json({
            message: `Login successful, OTP sent to email address: ${patientDetails?.email}`,
            email: patientDetails?.email,
         });
      } catch (error: any) {
         next(error);
      }
   }

   async resendOtp(req: Request, res: Response, next: NextFunction) {
      try {
         const { email } = req.body;
         await this.authUseCase.resendOtp(email);
         return res.status(StatusCode.Success).json({ message: "OTP sent to the email address" });
      } catch (error: any) {
         next(error);
      }
   }

   async validateOtp(req: Request, res: Response, next: NextFunction) {
      try {
         const { otp, email } = req.body;

         const { refreshToken, accessToken } = await this.authUseCase.validateOtp(otp, email);

         res.cookie(Cookie.Patient, refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
         });

         return res.status(StatusCode.Success).json({ accessToken });
      } catch (error: any) {
         next(error);
      }
   }

   async oAuthSignin(req: Request, res: Response, next: NextFunction) {
      try {
         const { email, name, profile } = req.body;

         const { accessToken, refreshToken } = await this.authUseCase.oAuthSignin(email, name, profile);

         res.cookie(Cookie.Patient, refreshToken, {
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

   async forgetPassword(req: Request, res: Response, next: NextFunction) {
      try {
         const { email } = req.body;

         await this.authUseCase.sendForgetPasswordMail(email);
         return res.status(StatusCode.Success).json({ message: "Email has been sent" });
      } catch (error: any) {
         next(error);
      }
   }

   async updatePassword(req: Request, res: Response, next: NextFunction) {
      try {
         const { email, newPassword } = req.body;
         await this.authUseCase.updatePatientPassword(email, newPassword);
         return res.status(StatusCode.Success).json({ message: "Password updated successfully" });
      } catch (error) {
         next(error);
      }
   }

   async refreshAccessToken(req: Request, res: Response, next: NextFunction) {
      try {
         const { patientToken } = req.cookies;
         if (!patientToken) return res.status(StatusCode.Forbidden).json({ message: "Unauthenticated" });

         const { accessToken } = await this.authUseCase.refreshAccessToken(patientToken);
         return res.status(StatusCode.Success).json({ accessToken });
      } catch (error: any) {
         next(error);
      }
   }

   logout(req: Request, res: Response, next: NextFunction) {
      try {
         const { patientToken } = req.cookies;
         if (!patientToken) return res.sendStatus(StatusCode.NoContent);

         res.clearCookie(Cookie.Patient, {
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
