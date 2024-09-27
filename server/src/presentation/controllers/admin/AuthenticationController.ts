import { NextFunction, Request, Response } from "express";
import AuthenticationUseCase from "../../../use_case/admin/AuthenticationUseCase";
import { Cookie, StatusCode } from "../../../types";

export default class AuthenticationController {
   constructor(
      private authUseCase: AuthenticationUseCase
   ) {
      this.login = this.login.bind(this);
      this.validateOtp = this.validateOtp.bind(this);
      this.resendOtp = this.resendOtp.bind(this);
      this.refreshAccessToken = this.refreshAccessToken.bind(this);
      this.logout = this.logout.bind(this);
   }

   async login(req: Request, res: Response, next: NextFunction) {
      try {
         const { email, password } = req.body;
         await this.authUseCase.login(email, password);

         res.status(StatusCode.Success).json({ message: "Logged in Successfully. Otp has Sended" });
      } catch (error) {
         next(error);
      }
   }

   async validateOtp(req: Request, res: Response, next: NextFunction) {
      try {
         const { email, otp } = req.body;

         const { accessToken, refreshToken } = await this.authUseCase.validateOtp(email, otp);

         res.cookie(Cookie.Admin, refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000,
         });

         res.status(StatusCode.Success).json({ accessToken });
      } catch (error) {
         next(error);
      }
   }

   async resendOtp(req: Request, res: Response, next: NextFunction) {
      try {
         const { email } = req.body;
         await this.authUseCase.resendOtp(email);

         res.status(StatusCode.Success).json({ message: "Otp has Send to the email" });
      } catch (error) {
         next(error);
      }
   }

   async refreshAccessToken(req: Request, res: Response, next: NextFunction) {
      try {
         const { adminToken } = req.cookies;
         if (!adminToken) return res.status(StatusCode.Forbidden).json({ message: "Unauthenticated" });
         const { accessToken } = await this.authUseCase.refreshAccessToken(adminToken);
         res.status(StatusCode.Success).json({ accessToken });
      } catch (error) {
         next(error);
      }
   }

   async logout(req: Request, res: Response, next: NextFunction) {
      try {
         const { adminToken } = req.cookies;
         if (!adminToken) return res.status(StatusCode.NoContent);
         res.clearCookie(Cookie.Admin, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
         });
         res.status(StatusCode.Success).json({ message: "Cookie Cleared" });
      } catch (error) {
         next(error);
      }
   }
}
