import { UserRole } from "aws-sdk/clients/workmail";

export default interface IDoctor {
   readonly _id?: string;
   readonly createdAt?: string;
   readonly updatedAt?: string;
   readonly email?: string;
   name?: string;
   phone?: string;
   password?: string;
   qualifications?: string[];
   role?: UserRole;
   isBlocked?: boolean;
   image?: string;
   token?: string;
   isVerified?: boolean;
}
