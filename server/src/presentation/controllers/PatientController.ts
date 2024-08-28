import UpdatePatientUseCase from "../../use_case/patient/UpdatePatientUseCase";
import RegisterPatientUseCase from "../../use_case/patient/RegisterPatientUseCase";
import LoginPatientUseCase from "../../use_case/patient/LoginPatientUseCase";
import { NextFunction, Request, Response } from "express";
import { IPatient } from "../../domain/entities/Patient";
import { isValidatePassword, isValidEmail } from "../validators/authValidators";

export default class PatientController {
   constructor(
      private patientUseCase: UpdatePatientUseCase,
      private registerPatientUseCase: RegisterPatientUseCase,
      private loginPatientUseCase: LoginPatientUseCase
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

         const patientDetails = await this.loginPatientUseCase.execute(patient);

         if (patientDetails) {
            res.status(200).json({
               message: `Login successful, OTP sent to email address : ${patientDetails.email}`,
               email: patientDetails.email,
            });
         } else {
            res.status(204).json({ message: "No further action required" });
         }
      } catch (error: any) {
         if (error.message === "User Not Found") {
            return res.status(404).json({ message: "User not found" });
         } else if (error.message === "Invalid Credentials") {
            return res.status(401).json({ message: "Invalid credentials" });
         } else if (error.message === "Unauthorized") {
            return res.status(401).json({ message: "Unauthorized" });
         }else{
            next(error);
         }
      }
   }

   async validateOtp(req: Request, res: Response, next: NextFunction) {
      try {
         const { otp, email } = req.body;

         if (!otp) return res.status(400).json({ message: "Otp is required" });
         if (!email) return res.status(400).json({ message: "Email is required" });

         const patient = await this.loginPatientUseCase.validateOtp(otp, email);

         res.status(200).json(patient);
      } catch (error: any) {
         if (error.message === "Invalid Otp") return res.status(401).json({ message: "Invalid Otp" });
         next(error);
      }
   }
}
