import { NextFunction, Response } from "express";
import ITokenService from "../../interface/services/ITokenService";
import { CustomRequest } from "../../types";

export default class PatientAuthMiddleware {
   constructor(private tokenService: ITokenService) {}

   exec = (req: CustomRequest, res: Response, next: NextFunction) => {
      try {
         const authHeader = req.headers.authorization || req.headers.Authorization;
         const tokenString = Array.isArray(authHeader) ? authHeader[0] : authHeader;

         if (!tokenString?.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: No or invalid Access token provided" });
         }

         const token = tokenString.split(" ")[1];

         if (!token) {
            return res.status(401).json({ message: "Unauthorized: Access Token is missing" });
         }

         const decodedToken = this.tokenService.verifyAccessToken(token);
         req.patient = {
            email: decodedToken.email,
            id: decodedToken.id,
         };
         next();
      } catch (error:any) {
         if (error.message === "TokenExpired") {
            return res.status(401).json({ message: "Access token expired" });
         }
         return res.status(401).json({ message: "Unauthorized: Invalid Access token" });
      }
   };
}
