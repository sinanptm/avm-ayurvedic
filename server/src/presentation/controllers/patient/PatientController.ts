import { NextFunction, Response } from "express";
import PatientUseCase from "../../../use_case/patient/PatientUseCases";
import { CustomRequest, StatusCode } from "../../../types";

export default class PatientController {
   constructor(private patientUseCase: PatientUseCase) {}

   async getProfile(req: CustomRequest, res: Response, next: NextFunction) {
      try {
         const { id } = req.patient!;
         const patient = await this.patientUseCase.getUserProfile(id);
         res.status(StatusCode.Success).json(patient);
      } catch (error) {
         next(error);
      }
   }

   async updateProfile(req: CustomRequest, res: Response, next: NextFunction) {
      try {
         const { id } = req.patient!;
         const patient = req.body.patient;
         if (!patient) return res.status(StatusCode.BadRequest).json({ message: "Patient Data is Required" });

         await this.patientUseCase.updateProfile(id, patient);
         res.status(StatusCode.Success).json({ message: "Personal Information Added Successfully" });
      } catch (error) {
         next(error);
      }
   }

   async getUploadUrl(req: CustomRequest, res: Response, next: NextFunction) {
      try {
         const { id } = req.patient!;
         const { url, key } = await this.patientUseCase.createPreSignedUrl(id);

         res.status(StatusCode.Success).json({ url, key });
      } catch (error) {
         next(error);
      }
   }

   async completeProfileImageUpload(req: CustomRequest, res: Response, next: NextFunction) {
      try {
         const { key } = req.body;
         const { id } = req.patient!;

         if (!key) {
            return res.status(StatusCode.BadRequest).json({ message: "Image key is required" });
         }

         await this.patientUseCase.updateProfileImage(id, key);
         res.status(StatusCode.Success).json({ message: "Profile image updated successfully" });
      } catch (error) {
         next(error);
      }
   }
}
