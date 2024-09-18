export interface IPatient {
   readonly _id?: string;
   readonly createdAt?: string;
   readonly updatedAt?: string;
   readonly email?: string;
   name?: string;
   password?: string;
   phone?: string;
   bloodGroup?: string;
   dob?: Date;
   isSubscribed?: boolean;
   isBlocked?: boolean;
   address?: string;
   token?: string;
   profile?: string;
   gender?: "Male" | "Female" | "Other";
   occupation?: string;
}
