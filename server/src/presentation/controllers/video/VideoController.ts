import { NextFunction, Response } from "express";
import GetVideoSectionUseCase from "../../../use_case/video/GetVideoSectionUseCase";
import { CustomRequest, StatusCode } from "../../../types";

export default class VideoController {
   constructor(private getVideoSectionUseCase: GetVideoSectionUseCase) {}

   async getSectionsInOneDayDoctor(req: CustomRequest, res: Response, next: NextFunction) {
      try {
         const doctorId = req.doctor?.id;
         const sections = await this.getVideoSectionUseCase.getSectionInOneDayDoctor(doctorId!);
         res.status(StatusCode.Success).json(sections);
      } catch (error) {}
   }

   async getSectionsInOneDayPatient(req: CustomRequest, res: Response, next: NextFunction) {
      try {
         const patientId = req.patient?.id;
         const sections = await this.getVideoSectionUseCase.getSectionsInOneDayPatient(patientId!);
         res.status(StatusCode.Success).json(sections);
      } catch (error) {
         next(error);
      }
   }

   async getAllSectionsDoctor(req: CustomRequest, res: Response, next: NextFunction) {
      try {
         const doctorId = req.doctor?.id;
         const sections = await this.getVideoSectionUseCase.getSectionsByDoctorId(doctorId!);
         res.status(StatusCode.Success).json(sections);
      } catch (error) {
         next(error);
      }
   }

   async getSectionById(req: CustomRequest, res: Response, next: NextFunction) {
      try {
         const sectionId = req.params.sectionId as string;
         const section = await this.getVideoSectionUseCase.getSectionById(sectionId);
         res.status(StatusCode.Success).json({ section });
      } catch (error) {
         next(error);
      }
   }
}
