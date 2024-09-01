import AuthPatientUseCase from "../../use_case/patient/AuthPatientUseCase";
import { NextFunction, Request, Response } from "express";
import { IPatient } from "../../domain/entities/Patient";
import { isValidatePassword, isValidEmail } from "../validators/authValidators";

export default class PatientController {
   constructor(private authPatientUseCase: AuthPatientUseCase) {}

   async register(req: Request, res: Response, next: NextFunction) {
      try {
         const patient: IPatient = req.body;

         // Input Validations
         if (!patient.email?.trim()) return res.status(400).json({ message: "Email is Required" });
         if (!isValidEmail(patient.email)) return res.status(422).json({ message: "Invalid Email Format" });
         if (!patient.password?.trim()) return res.status(400).json({ message: "Password is required" });
         if (!isValidatePassword(patient.password)) return res.status(422).json({ message: "Password is too week" });
         if (!patient.name?.trim()) return res.status(400).json({ message: "Name is required" });
         if (!patient.phone?.toString().trim()) return res.status(400).json({ message: "Phone number is required" });

         res.status(200).json({ message: await this.authPatientUseCase.register(patient) });
      } catch (error) {
         next(error);
      }
   }

   async login(req: Request, res: Response, next: NextFunction) {
      try {
         let patient: IPatient = req.body;
         // Input validations
         if (!patient.email?.trim()) return res.status(400).json({ message: "Email is required" });
         if (!isValidEmail(patient.email)) return res.status(422).json({ message: "Invalid email format" });
         if (!patient.password?.trim()) return res.status(400).json({ message: "Password is required" });

         const patientDetails = await this.authPatientUseCase.login(patient);

         if (patientDetails) {
            res.status(200).json({
               message: `Login successful, OTP sent to email address : ${patientDetails.email}`,
               email: patientDetails.email,
            });
         } else {
            res.status(204).json({ message: "No further action required" });
         }
      } catch (error: any) {
         next(error);
      }
   }

   async resendOtp(req: Request, res: Response, next: NextFunction) {
      try {
         const { email } = req.body;
         if (!email) return res.status(400).json({ message: "Email is required" });
         await this.authPatientUseCase.resendOtp(email);
         res.status(200).json({ message: "Otp Sended to the mail Address" });
      } catch (error: any) {
         if (error.message === "Patient Not Found") {
            return res.status(422).json({ message: "Invalid Credentials" });
         }
         next(error);
      }
   }

   async validateOtp(req: Request, res: Response, next: NextFunction) {
      try {
         const { otp, email } = req.body;

         if (!otp) return res.status(400).json({ message: "Otp is required" });
         if (!email) return res.status(400).json({ message: "Email is required" });

         const { refreshToken, accessToken } = await this.authPatientUseCase.validateOtp(otp, email);

         res.cookie("patientToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict" as const,
            maxAge: 30 * 24 * 60 * 1000,
         });

         res.json({ accessToken });
      } catch (error: any) {
         next(error);
      }
   }

   async oAuthSignin(req: Request, res: Response, next: NextFunction) {
      try {
         const { email, name, profile } = req.body;
         if (!email) return res.status(400).json({ message: "Email is Required" });
         if (!name) return res.status(400).json({ message: "Name is Required" });
         const { accessToken, refreshToken } = await this.authPatientUseCase.oAuthSignin(email, name, profile);

         res.cookie("patientToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict" as const,
            maxAge: 30 * 24 * 60 * 1000,
         });

         res.json({ accessToken });
      } catch (error) {
         next(error);
      }
   }

   async forgetPassword(req: Request, res: Response, next: NextFunction) {
      try {
         const { email } = req.body;
         if (!email) return res.status(400).json({ message: "Email is Required" });
         await this.authPatientUseCase.sendForgetPasswordMail(email);
         res.status(200).json({ message: "Email has been sended" });
      } catch (error: any) {
         next(error);
      }
   }

   async updatePassword(req: Request, res: Response, next: NextFunction) {
      try {
         const { email, oldPassword, newPassword } = req.body;

         if (!email) return res.status(400).json({ message: "Email is Required" });
         if (!oldPassword.trim()) return res.status(400).json({ message: "Old Password is required" });
         if (!newPassword?.trim()) return res.status(400).json({ message: "New Password is required" });

         if (!isValidatePassword(newPassword)) return res.status(422).json({ message: "Password is too week" });

         await this.authPatientUseCase.updatePatientPassword(email, oldPassword, newPassword);

         res.status(200).json({ message: "Password Updated Successfully" });
      } catch (error) {
         next(error);
      }
   }

   async refreshAccessToken(req: Request, res: Response, next: NextFunction) {
      try {
         const cookies = req.cookies;
         if (!cookies?.patientToken) return res.status(403).json({ message: "Unauthenticated" });

         const newAccessToken = await this.authPatientUseCase.refreshAccessToken(cookies.patientToken);

         return res.status(200).json(newAccessToken);
      } catch (error: any) {
         next(error);
      }
   }

   logout(req: Request, res: Response, next: NextFunction) {
      try {
         const cookies = req.cookies;
         if (!cookies?.patientToken) return res.sendStatus(204);
         res.clearCookie("patientToken", {
            httpOnly: true,
            sameSite: "strict" as const,
            secure: true,
         });
         res.status(204).json({ message: "cookie cleared" });
      } catch (error) {
         next(error);
      }
   }
}
