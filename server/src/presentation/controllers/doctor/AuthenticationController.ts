import { NextFunction, Request, Response } from "express";
import AuthenticationUseCase from "../../../use_case/doctor/AuthenticationUseCase";
import { StatusCode } from "../../../types";

export default class AuthDoctorController {
   constructor(private authDoctorUseCase: AuthenticationUseCase) {}

   async signin(req: Request, res: Response, next: NextFunction) {
    try {
        const {email,password} = req.body;
    if(!email.trim())return res.status(StatusCode.BadRequest).json("Email is Required")
    if(!password.trim())return res.status(StatusCode.BadRequest).json("Password is Required")

    await this.authDoctorUseCase.signin(email,password);
    
    } catch (error:any) {
        if(error.message==='Not Verified'){
            return res.status(StatusCode.BadRequest).json({message:"Please Verify For Continue"})
        }
        next(error)
    }

   }

}
