import RegisterPatientUseCase from "../../use_case/patient/RegisterPatientUseCase";
import AuthPatientUseCase from "../../use_case/patient/AuthPatientUseCase";
import { NextFunction, Request, Response } from "express";
import { IPatient } from "../../domain/entities/Patient";
import { isValidatePassword, isValidEmail } from "../validators/authValidators";

export default class PatientController {
   constructor(
      private registerPatientUseCase: RegisterPatientUseCase,
      private authPatientUseCase: AuthPatientUseCase
   ) {}

   async register(req: Request, res: Response, next: NextFunction) {
      try {
         const patient: IPatient = req.body;

         // email validation
         if (!patient.email?.trim()) return res.status(400).json({ message: "Email is Required" });
         if (!isValidEmail(patient.email)) return res.status(422).json({ message: "Invalid Email Format" });

         // password validation
         if (!patient.password?.trim()) return res.status(400).json({ message: "Password is required" });
         if (!isValidatePassword(patient.password)) return res.status(422).json({ message: "Password is too week" });

         // name validation
         if (!patient.name?.trim()) return res.status(400).json({ message: "Name is required" });

         // phone validation
         if (!patient.phone?.toString().trim()) return res.status(400).json({ message: "Phone number is required" });

         res.status(200).json({ message: await this.registerPatientUseCase.execute(patient) });
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
         res.status(200).json({message:"Otp Sended to the mail Address"});
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
