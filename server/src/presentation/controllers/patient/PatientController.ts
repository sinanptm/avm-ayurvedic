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
   
   async getUploadUrl(req: CustomRequest, res: Response, next: NextFunction) {
      try {
         const { id } = req.patient!;
         const {url,key} = await this.patientUseCase.createPreSignedUrl(id);
         
         res.status(200).json({ url,key });
      } catch (error) {
         next(error);
      }
   }

   async completeProfileImageUpload(req: CustomRequest, res: Response, next: NextFunction) {
      try {
          const { key } = req.body; 
          const { id } = req.patient!;

          if (!key) {
              return res.status(400).json({ message: "Image key is required" });
          }
          const imageUrl = await this.patientUseCase.updateProfileImage(id, key);

          res.status(200).json({ message: "Profile image updated successfully", imageUrl });
      } catch (error) {
          next(error);
      }
  }
}
