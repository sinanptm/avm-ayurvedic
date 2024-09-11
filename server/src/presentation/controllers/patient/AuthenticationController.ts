import AuthenticationUseCase from "../../../use_case/patient/AuthenticationUseCase";
import { NextFunction, Request, Response } from "express";
import { isValidatePassword, isValidEmail } from "../../validators/entitieValidators";
import { Cookie, StatusCode } from "../../../types";

export default class AuthPatientController {
   constructor(private authUseCase: AuthenticationUseCase) { }

   async register(req: Request, res: Response, next: NextFunction) {
      try {
         const patient = req.body;

         // Validation
         if (!patient.email?.trim()) {
            return res.status(StatusCode.BadRequest).json({ message: "Email is required" });
         }
         if (!isValidEmail(patient.email)) {
            return res.status(StatusCode.UnprocessableEntity).json({ message: "Invalid email format" });
         }
         if (!patient.password?.trim()) {
            return res.status(StatusCode.BadRequest).json({ message: "Password is required" });
         }
         if (!isValidatePassword(patient.password)) {
            return res.status(StatusCode.UnprocessableEntity).json({ message: "Password is too weak" });
         }
         if (!patient.name?.trim()) {
            return res.status(StatusCode.BadRequest).json({ message: "Name is required" });
         }
         if (!patient.phone?.toString().trim()) {
            return res.status(StatusCode.BadRequest).json({ message: "Phone number is required" });
         }

         const result = await this.authUseCase.register(patient);
         return res.status(StatusCode.Created).json({ message: result });
      } catch (error) {
         next(error);
      }
   }

   async login(req: Request, res: Response, next: NextFunction) {
      try {
         const patient = req.body;

         // Input validations
         if (!patient.email?.trim()) {
            return res.status(StatusCode.BadRequest).json({ message: "Email is required" });
         }
         if (!isValidEmail(patient.email)) {
            return res.status(StatusCode.UnprocessableEntity).json({ message: "Invalid email format" });
         }
         if (!patient.password?.trim()) {
            return res.status(StatusCode.BadRequest).json({ message: "Password is required" });
         }

         const patientDetails = await this.authUseCase.login(patient);
         return res.status(StatusCode.Success).json({
            message: `Login successful, OTP sent to email address: ${patientDetails?.email}`,
            email: patientDetails?.email,
         });
      } catch (error: any) {
         if (error.message === "Patient has no Password") {
            return res.status(StatusCode.Unauthorized).json({ message: "Please use other login methods" });
         }
         next(error);
      }
   }

   async resendOtp(req: Request, res: Response, next: NextFunction) {
      try {
         const { email } = req.body;
         if (!email) return res.status(StatusCode.BadRequest).json({ message: "Email is required" });

         await this.authUseCase.resendOtp(email);
         return res.status(StatusCode.Success).json({ message: "OTP sent to the email address" });
      } catch (error: any) {
         next(error);
      }
   }

   async validateOtp(req: Request, res: Response, next: NextFunction) {
      try {
         const { otp, email } = req.body;

         if (!otp) return res.status(StatusCode.BadRequest).json({ message: "OTP is required" });
         if (!email) return res.status(StatusCode.BadRequest).json({ message: "Email is required" });

         const { refreshToken, accessToken } = await this.authUseCase.validateOtp(otp, email);

         // Set refresh token in cookie
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

   // OAuth sign-in
   async oAuthSignin(req: Request, res: Response, next: NextFunction) {
      try {
         const { email, name, profile } = req.body;

         if (!email) return res.status(StatusCode.BadRequest).json({ message: "Email is required" });
         if (!name) return res.status(StatusCode.BadRequest).json({ message: "Name is required" });

         const { accessToken, refreshToken } = await this.authUseCase.oAuthSignin(email, name, profile);

         // Set refresh token in cookie
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

   // Send password reset email
   async forgetPassword(req: Request, res: Response, next: NextFunction) {
      try {
         const { email } = req.body;
         if (!email) return res.status(StatusCode.BadRequest).json({ message: "Email is required" });

         await this.authUseCase.sendForgetPasswordMail(email);
         return res.status(StatusCode.Success).json({ message: "Email has been sent" });
      } catch (error: any) {
         next(error);
      }
   }

   // Update patient's password
   async updatePassword(req: Request, res: Response, next: NextFunction) {
      try {
         const { email, newPassword } = req.body;

         if (!email) return res.status(StatusCode.BadRequest).json({ message: "Email is required" });
         if (!newPassword?.trim()) {
            return res.status(StatusCode.BadRequest).json({ message: "New password is required" });
         }
         if (!isValidatePassword(newPassword)) {
            return res.status(StatusCode.UnprocessableEntity).json({ message: "Password is too weak" });
         }

         await this.authUseCase.updatePatientPassword(email, newPassword);
         return res.status(StatusCode.Success).json({ message: "Password updated successfully" });
      } catch (error) {
         next(error);
      }
   }

   // Refresh access token using refresh token
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

   // Logout patient and clear cookie
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
