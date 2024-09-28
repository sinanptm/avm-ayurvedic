import ITokenService from "../../domain/interface/services/ITokenService";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { StatusCode, UserRole } from "../../types/index";
import CustomError from "../../domain/entities/CustomError";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../../config/env";

export default class JWTService implements ITokenService {
   private signToken(payload: object, secret: string, expiresIn: string): string {
      return jwt.sign(payload, secret, { expiresIn });
   }
   private verifyToken(token: string, secret: string): JwtPayload {
      try {
         return jwt.verify(token, secret) as JwtPayload;
      } catch (error) {
         if (error instanceof TokenExpiredError) {
            throw new CustomError("Token Expired", StatusCode.Unauthorized);
         }
         throw new CustomError("Invalid token", StatusCode.Forbidden);
      }
   }

   createRefreshToken(email: string, id: string): string {
      return this.signToken({ email, id }, REFRESH_TOKEN_SECRET!, "7d");
   }

   verifyRefreshToken(token: string): { email: string; id: string } {
      const decoded = this.verifyToken(token, REFRESH_TOKEN_SECRET!);
      return { email: decoded.email, id: decoded.id };
   }

   createAccessToken(email: string, id: string, role: UserRole): string {
      return this.signToken({ email, id, role }, ACCESS_TOKEN_SECRET!, "15m");
   }

   verifyAccessToken(token: string): { email: string; id: string; role: UserRole } {
      const { email, id, role } = this.verifyToken(token, ACCESS_TOKEN_SECRET!);
      return { email, id, role };
   }
}
