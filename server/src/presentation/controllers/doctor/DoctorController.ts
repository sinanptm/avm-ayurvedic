import { NextFunction, Response } from "express";
import { CustomRequest, StatusCode } from "../../../types";
import GetPatientUseCaseDoctor from "../../../use_case/doctor/GetPatientUseCase";

export default class DoctorController {
   constructor(private getPatientUseCase: GetPatientUseCaseDoctor) {}

   async getPatients(req: CustomRequest, res: Response, next: NextFunction) {
      try {
         const doctorId = req.doctor?.id!;
         let offset = +(req.query.offset as string);
         let limit = +(req.query.limit as string);

         offset = isNaN(offset) || offset < 0 ? 0 : offset;
         limit = isNaN(limit) || limit < 0 ? 10 : Math.min(limit, 100);

         const patients = await this.getPatientUseCase.exec(doctorId, limit, offset);
         res.status(StatusCode.Success).json(patients);
      } catch (error) {
         next(error);
      }
   }

   async getMedicalHistory(req: CustomRequest, res: Response, next: NextFunction) {
      try {
         const patientId = req.params.patientId;
         let offset = +(req.query.offset as string);
         let limit = +(req.query.limit as string);

         offset = isNaN(offset) || offset < 0 ? 0 : offset;
         limit = isNaN(limit) || limit < 0 ? 10 : Math.min(limit, 100);
         const history = await this.getPatientUseCase.getMedicalHistory(patientId, offset, limit);
         res.status(StatusCode.Success).json(history);
      } catch (error) {
         next(error);
      }
   }
}
