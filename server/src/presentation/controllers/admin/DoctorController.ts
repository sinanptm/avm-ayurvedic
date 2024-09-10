import { NextFunction, Request, Response } from "express";
import AdminDoctorUseCase from "../../../use_case/admin/DoctorUseCase";
import { StatusCode } from "../../../types";
import IDoctor from "../../../domain/entities/IDoctor";

export default class AdminDoctorController {
   constructor(private doctorUseCase: AdminDoctorUseCase) {}

   async getDoctors(req: Request, res: Response, next: NextFunction) {
      try {
         const offset = parseInt(req.query.offset as string) || 0;
         const limit = parseInt(req.query.limit as string) || 10;
         const doctors = await this.doctorUseCase.getAll(offset, limit);
         res.status(StatusCode.Success).json(doctors);
      } catch (error) {
         next(error);
      }
   }

   async updateDoctor(req: Request, res: Response, next: NextFunction) {
      try {
         const doctor: IDoctor = req.body;
         if (!doctor) return res.status(StatusCode.BadRequest).json({ message: "Doctor Details is Required" });
         if (!doctor._id) return res.status(StatusCode.BadRequest).json({ message: "Id is Required" });
         await this.doctorUseCase.update(doctor);
         res.status(StatusCode.Success).json({ message: "Doctor has verified" });
      } catch (error) {
         next(error);
      }
   }
}
