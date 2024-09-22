import { UserRole } from "../../../types";

export default interface ITokenService {
   createRefreshToken(email: string, id: string): string;
   verifyRefreshToken(token: string): { email: string; id: string };
   createAccessToken(email: string, id: string, role: UserRole): string;
   verifyAccessToken(token: string): { email: string; id: string; role: UserRole };
}
