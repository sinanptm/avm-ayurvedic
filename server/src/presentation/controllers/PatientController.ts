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

   async registerPatient(req: Request, res: Response, next: NextFunction) {
      try {
         const patient = req.body.patient as IPatient;

         //  * email validation
         if (!patient.email?.trim()) return res.status(400).json({ message: "Email is Required" });
         if (!isValidEmail(patient.email)) return res.status(422).json({ message: "Invalid Email Format" });

         //  * password validation
         if (!patient.password?.trim()) return res.status(400).json({ message: "Password is required" });
         if (!isValidatePassword(patient.password)) return res.status(422).json({ message: "Password is too week" });

         //  * name validation
         if (!patient.name?.trim()) return res.status(400).json({ message: "Name is required" });

         //  * phone validation
         if (!patient.phone?.toString().trim()) return res.status(400).json({ message: "Phone number is required" });

         const newPatient = await this.registerPatientUseCase.execute(patient);

         res.status(200).json({ patient: newPatient });
      } catch (error) {
         console.error("Error registering patient:", error);
         next(error);
      }
   }

   async loginPatient(req: Request, res: Response, next: NextFunction) {
      try {
         this.loginPatientUseCase.execute(req.body.patient);
      } catch (error) {
         console.log("Error in Patient login : ", error);
         next(error);
      }
   }
}
