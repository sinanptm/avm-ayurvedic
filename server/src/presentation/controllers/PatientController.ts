import { NextFunction, Response } from "express";
import PatientUseCase from "../../use_case/patient/PatientUseCases";
import { CustomRequest } from "../../types";

export default class PatientController {
   constructor(private patientUseCase: PatientUseCase) {}

   async getProfile(req: CustomRequest, res: Response, next: NextFunction) {
      try {
         const { id } = req.patient!;
         const patient = await this.patientUseCase.getUserProfile(id);
         res.status(200).json(patient);
      } catch (error) {
         next(error);
      }
   }

   async updateProfile(req: CustomRequest, res: Response, next: NextFunction) {
      try {
         const { id } = req.patient!;
         const { patient } = req.body;
         if (!patient) return res.status(400).json({ message: "Patient Data is Required" });
         
         await this.patientUseCase.updateProfile(id, patient);
         res.status(200).json({ message: "Personal Information Added Successfully" });
      } catch (error) {
         next(error);
      }
   }
}
