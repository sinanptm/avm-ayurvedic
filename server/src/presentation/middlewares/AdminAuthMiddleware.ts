import { NextFunction, Response } from "express";
import ITokenService from "../../domain/interface/services/ITokenService";
import { CustomRequest, StatusCode, UserRole } from "../../types";
import logger from "../../utils/logger";

export default class AdminAuthMiddleware {
   constructor(private tokenService: ITokenService) { 
      this.exec = this.exec.bind(this);
   }

   exec(req: CustomRequest, res: Response, next: NextFunction) {
      try {
         const authHeader = req.headers.authorization || req.headers.Authorization;
         const tokenString = Array.isArray(authHeader) ? authHeader[0] : authHeader;
         if (!tokenString?.startsWith("Bearer ")) {
            return res
               .status(StatusCode.Unauthorized)
               .json({ message: "Unauthorized: No or invalid Access token provided" });
         }
         const token = tokenString.split(" ")[1];
         if (!token) {
            return res.status(StatusCode.Unauthorized).json({ message: "Unauthorized: Access Token is missing" });
         }
         const { id, email, role } = this.tokenService.verifyAccessToken(token);
         if (!id || !email || !role) {         
            logger.warn("Unauthorized: Invalid Access Token Attempt");
            return res.status(StatusCode.Unauthorized).json({ message: "Unauthorized: Invalid Access Token" });
         }
         
         if (role !== UserRole.Admin) {
            return res.status(StatusCode.Forbidden).json({ message: "Forbidden: Access restricted to admins" });
         }
         req.admin = { email, id };

         next();
      } catch (error: any) {
         if (error.message === "Token Expired") {
            return res.status(StatusCode.Unauthorized).json({ message: "Access token expired" });
         }
         return res.status(StatusCode.Unauthorized).json({ message: "Unauthorized: Invalid Access token" });
      }
   }
}
