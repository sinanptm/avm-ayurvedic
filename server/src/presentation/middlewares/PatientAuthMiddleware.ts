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
            return res.status(401).json({ message: "Unauthorized: No or invalid token provided" });
         }

         const token = tokenString.split(" ")[1];

         if (!token) {
            return res.status(401).json({ message: "Unauthorized: Token is missing" });
         }

         const decodedToken = this.tokenService.verifyAccessToken(token);
         req.patient = {
            email: decodedToken.email,
            id: decodedToken.id,
         };
         next();
      } catch (error) {
         res.status(401).json({ message: "Forbidden" });
      }
   };
}
