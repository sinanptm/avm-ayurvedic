import { NextFunction, Response } from "express";
import PatientUseCase from "../../../use_case/patient/PatientUseCases";
import { CustomRequest } from "../../../types";

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

   async updateProfileImage(req: CustomRequest, res: Response, next: NextFunction) {
      try {
         const file = req.file;
         const { id } = req.patient!;
   
         if (!file) {
            return res.status(400).json({ message: "No file uploaded" });
         }
   
         await this.patientUseCase.updateProfileImage(id, file.buffer, file.mimetype);
   
         res.status(200).json({ message: "Profile image updated successfully" });
      } catch (error) {
         next(error);
      }
   }
   
   async getUploadUrl(req: CustomRequest, res: Response, next: NextFunction) {
      try {
         const { id } = req.patient!;
         const url = await this.patientUseCase.createPreSignedUrl(id, 60 * 5); // URL valid for 5 minutes
         res.status(200).json({ url });
      } catch (error) {
         next(error);
      }
   }
}
