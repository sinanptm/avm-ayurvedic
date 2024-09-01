export interface IPatient {
   _id?: string;
   name?: string;
   email?: string;
   password?: string;
   phone?: string;
   bloodGroup?: string;
   dob?: Date;
   isSubscribed: boolean;
   isBlocked?: false;
   address?: string;
   token?: string;
   createdAt?:string;
   updatedAt?:string;
   profile?:string;
}
