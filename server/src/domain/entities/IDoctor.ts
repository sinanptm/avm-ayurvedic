export default interface IDoctor {
   _id?: string;
   name?: string;
   phone?: string;
   password?:string;
   qualification?: string[];
   role?: "admin" | "doctor";
   isBlocked?: boolean;
   image?: string;
   email?: string;
   updatedAt?: string;
   createdAt?: string;
   token?:string;
   isVerified?:boolean;
}
