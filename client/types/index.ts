import { ReactNode } from "react";

export type DoctorType = {
   _id: string;
   name: string;
   image: string;
};

export type NavLinkType = {
   label: string;
   href: string;
};

export type AnimatedCardProps = {
   image: string;
   heading: string;
   text?: string;
   key: string | number;
   link?: string;
   linkText?: string;
   className?: string;
   imageClassName?: string;
   children?: ReactNode;
};


export type SideBarLink = {
   label:string;
   href:string;
   icon:ReactNode;
   admin?:boolean;
};


export interface IPatient {
   _id?: string;
   name?: string;
   email?: string;
   password?: string;
   phone?: string;
   bloodGroup?: string;
   dob?: Date;
   isSubscribed?: boolean;
   isBlocked?: false;
   address?: string;
   token?: string;
}
