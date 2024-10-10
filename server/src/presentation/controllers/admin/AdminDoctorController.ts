import { NextFunction, Request, Response } from "express";
import AdminDoctorUseCase from "../../../use_case/admin/AdminDoctorUseCase";
import { DoctorsFilter, StatusCode, CustomRequest } from "../../../types";
import IDoctor from "../../../domain/entities/IDoctor";

export default class AdminDoctorController {
   constructor(
      private adminDoctorUseCase: AdminDoctorUseCase
   ) { }

   async getDoctors(req: Request, res: Response, next: NextFunction) {
      try {
         let offset = +(req.query.offset as string);
         let limit = +(req.query.limit as string);
         const type = req.query.type as DoctorsFilter;

         offset = isNaN(offset) || offset < 0 ? 0 : offset;
         limit = isNaN(limit) || limit < 0 ? 10 : Math.min(limit, 100);

         const validTypes = [DoctorsFilter.BLOCKED, DoctorsFilter.VERIFIED, DoctorsFilter.NOT_VERIFIED];
         const doctorType = validTypes.includes(type) ? type : DoctorsFilter.VERIFIED;

         const doctors = await this.adminDoctorUseCase.getAll(offset, limit, doctorType);
         res.status(StatusCode.Success).json(doctors);
      } catch (error) {
         next(error);
      }
   }

   async updateDoctor(req: CustomRequest, res: Response, next: NextFunction) {
      try {
         const doctor: IDoctor = req.body;
         const adminEmail = req.admin?.email
         if (!doctor) return res.status(StatusCode.BadRequest).json({ message: "Doctor Details is Required" });
         if (!doctor._id) return res.status(StatusCode.BadRequest).json({ message: "Id is Required" });
         await this.adminDoctorUseCase.update(doctor, adminEmail!);
         res.status(StatusCode.Success).json({ message: "Doctor has verified" });
      } catch (error) {
         next(error);
      }
   }
}
