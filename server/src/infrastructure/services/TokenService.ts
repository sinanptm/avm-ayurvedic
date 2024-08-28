import ITokenService from "../../interface/services/ITokenService";
import jwt, { JwtPayload } from "jsonwebtoken";

export default class TokenService implements ITokenService {
   private signToken(payload:object,secret:string,expiresIn:string):string{
      return jwt.sign(payload,secret,{expiresIn});
   }
   private verifyToken(token:string,secret:string):JwtPayload{
      try {
         return jwt.verify(token,secret) as JwtPayload
      } catch (error) {
         throw new Error("Invalid token")
      }
   }
  
   createRefreshToken(email: string, id: string): string {
      return this.signToken({ email, id }, process.env.REFRESH_TOKEN_SECRET!, "7d");
   }

   verifyRefreshToken(token: string): { email: string; id: string } {
      const decoded = this.verifyToken(token, process.env.REFRESH_TOKEN_SECRET!);
      return { email: decoded.email, id: decoded.id };
   }

   createAccessToken(email: string, id: string): string {
      return this.signToken({ email, id }, process.env.ACCESS_TOKEN_SECRET!, "15m");
   }

   verifyAccessToken(token: string): { email: string; id: string } {
      const decoded = this.verifyToken(token, process.env.ACCESS_TOKEN_SECRET!);
      return { email: decoded.email, id: decoded.id };
   }
   
}
