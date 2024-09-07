import { NextFunction, Request, Response } from "express";
import AdminDoctorUseCase from "../../../use_case/admin/DoctorUseCase";
import { StatusCode } from "../../../types";
import { isValidEmail } from "../../validators/authValidators";

export default class AdminDoctorController {
   constructor(private doctorUseCase: AdminDoctorUseCase) {}

   async create(req: Request, res: Response, next: NextFunction) {
      try {
         const { email } = req.body;

         if (!email) return res.status(StatusCode.BadRequest).json({ message: "Email is Required" });
         if (!isValidEmail(email))
            return res.status(StatusCode.UnprocessableEntity).json({ message: "Email is Not Valid" });

         await this.doctorUseCase.create(email);

         res.status(StatusCode.Success).json({message:"Doctor has Created"})
      } catch (error) {
         next(error);
      }
   }
}
