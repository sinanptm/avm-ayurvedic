import { NextFunction, Request, Response } from "express";
import AuthenticationUseCase from "../../../use_case/admin/AuthenticationUseCase";
import { StatusCode } from "../../../types";

export default class AuthenticationController {
   constructor(private authUseCase: AuthenticationUseCase) {}

   async login(req: Request, res: Response, next: NextFunction) {
      try {
         const { email, password } = req.body;
         if (!email?.trim() || !password?.trim()) throw new Error( "Invalid Credentials" )
          
         await this.authUseCase.login(email, password);
         res.status(StatusCode.Success).json({ message: "Logged in Successfully" });
      } catch (error) {
         next(error);
      }
   }
}
