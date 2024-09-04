import { NextFunction, Request, Response } from "express";
import AuthenticationUseCase from "../../../use_case/admin/AuthenticationUseCase";
import { Cookie, StatusCode } from "../../../types";

export default class AuthenticationController {
   constructor(
      private authUseCase: AuthenticationUseCase,
   ) {}

   async login(req: Request, res: Response, next: NextFunction) {
      try {
         const { email, password } = req.body;
         if (!email?.trim() || !password?.trim()) throw new Error("Invalid Credentials");

         await this.authUseCase.login(email, password);

         res.status(StatusCode.Success).json({ message: "Logged in Successfully" });
      } catch (error) {
         next(error);
      }
   }

   async validateOtp(req:Request,res:Response,next:NextFunction){
      try {
         const {email,otp} = req.body;
         if(!email.trim()) return res.status(StatusCode.BadRequest).json({message:"Email is Required"});
         const {accessToken,refreshToken} =  await this.authUseCase.validateOtp(email,otp);

         res.cookie(Cookie.Admin, refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000, 
         });

         res.status(StatusCode.Success).json({accessToken})
      } catch (error) {
         next(error)
      }
   }

   async resendOtp(req:Request,res:Response,next:NextFunction){
      try {
         const {email} = req.body;
         if(!email?.trim()) return res.status(StatusCode.BadRequest).json({message:"Email is Required"});

         await this.authUseCase.resendOtp(email);

         res.status(StatusCode.Success).json({message:"Otp has Send to the email"});
      } catch (error) {
         next(error);
      }
   }
}
