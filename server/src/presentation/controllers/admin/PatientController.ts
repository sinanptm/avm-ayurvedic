import { NextFunction, Request, Response } from "express";
import AdminPatientUseCase from "../../../use_case/admin/PatientUseCase";
import { StatusCode } from "../../../types";

export default class AdminPatientController {
   constructor(private adminPatientUseCase: AdminPatientUseCase) {}

   async getPatients(req: Request, res: Response, next: NextFunction) {
      try {
         const offset = parseInt(req.query.offset as string) || 0;
         const limit = parseInt(req.query.limit as string) || 10;

         const patients = await this.adminPatientUseCase.getAll(offset, limit);
         res.status(StatusCode.Success).json(patients);
      } catch (error) {
         next(error);
      }
   }

   async updatePatient(req: Request, res: Response, next: NextFunction) {
      try {
         const { id, isBlocked } = req.body;

         if (!id.trim() || typeof isBlocked !== "boolean") {
            return res.status(StatusCode.BadRequest).json({ message: "_id Is Required" });
         }

         await this.adminPatientUseCase.blockUnblock(id, isBlocked);

         res.status(StatusCode.Success).json({
            message: `Patient ${isBlocked ? "Unblocked" : "Blocked"} Successfully`,
         });
      } catch (error) {
         next(error);
      }
   }
}
