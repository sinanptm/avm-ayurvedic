import { ReactNode } from "react";

export type NavLinkType = {
   label: string;
   href: string;
   icon?: string;
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

export interface IPatient {
   _id?: string;
   name?: string;
   email?: string;
   password?: string;
   phone?: string;
   bloodGroup?: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
   dob?: Date;
   isSubscribed?: boolean;
   isBlocked?: boolean;
   address?: string;
   profile?: string;
   occupation?: string;
   gender?: "Male" | "Female" | "Other";
}

export interface ErrorResponse {
   message?: string;
   stack?: string;
}

export interface MessageResponse {
   message: string;
}

export interface PaginatedResult<T> {
   items: T[];
   totalItems: number;
   currentPage: number;
   totalPages: number;
   hasNextPage: boolean;
   hasPreviousPage: boolean;
}

export interface IDoctor {
   _id?: string;
   name?: string;
   phone?: string;
   password?: string;
   qualifications?: string[];
   isBlocked?: boolean;
   image?: string;
   email?: string;
   updatedAt?: string;
   createdAt?: string;
   isVerified?: boolean;
}

export enum DoctorsFilter {
   BLOCKED = "blocked",
   NOT_VERIFIED = "not-verified",
   VERIFIED = "verified",
}

export type SlotStatus = "available" | "booked";
export enum Days {
   Monday = "monday",
   Tuesday = "tuesday",
   Wednesday = "wednesday",
   Thursday = "thursday",
   Friday = "friday",
   Saturday = "saturday",
   Sunday = "sunday",
}
export interface ISlot {
   _id?: string;
   doctorId?: string;
   day?: Days;
   startTime?: string;
   endTime?: string;
   status?: SlotStatus;
}

export enum AppointmentStatus {
   // PAYMENT_PENDING = "payment-pending",
   PENDING = "pending",
   CONFIRMED = "confirmed",
   CANCELLED = "cancelled",
   COMPLETED = "completed",
}
export enum AppointmentType {
   VIDEO_CONSULTING = "video-consulting",
   IN_PERSON = "in-person",
}
export interface IAppointment {
   readonly _id?: string;
   readonly doctorId?: string;
   readonly patientId?: string;
   readonly slotId?: string;
   readonly createdAt?: string;
   readonly updatedAt?: string;
   readonly appointmentType?: AppointmentType;
   readonly appointmentDate?: string;
   readonly reason?: string;
   readonly notes?: string;
   status?: AppointmentStatus;
}

export interface IExtendedAppointment extends IAppointment {
   patient?: IPatient;
   slot?: ISlot;
   doctor?: IDoctor;
}



export enum NotificationTypes {
   APPOINTMENT_CANCELED = 'appointment_canceled',
   APPOINTMENT_CONFIRMED = 'appointment_confirmed',
   APPOINTMENT_REMINDER = 'appointment_reminder',
}

export interface INotification {
   readonly _id?: string;
   readonly patientId?: string;
   readonly doctorId?: string;
   readonly type?: NotificationTypes;
   readonly message?: string;
   readonly createdAt?: Date;
   readonly updatedAt?: Date;
   readonly appointmentId?:string
}


export interface IChat {
   readonly _id?: string;
   readonly doctorId?: string;
   readonly patientId?: string;
   readonly doctorProfile?:string;
   readonly patientProfile?:string;
   readonly createdAt?: Date;
   readonly updatedAt?: Date;
   readonly doctorName?: string;
   readonly patientName?: string;
   readonly notSeenMessages?:number;
}

export interface IMessage {
   readonly _id?: string;
   readonly chatId?: string;
   readonly senderId?:string;
   readonly receiverId?:string;
   readonly message?: string;
   readonly createdAt?: Date;
   readonly updatedAt?: Date;
   readonly isReceived?:boolean;
}