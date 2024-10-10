import { FC, ReactNode } from "react";
import { Control } from "react-hook-form";
import { FormFieldType } from "./enum";

export type NavLinkType = {
   label: string;
   href: string;
   icon?: string;
};

export type AnimatedCardProps = Readonly<{
   image: string;
   heading: string;
   text?: string;
   key: string | number;
   link?: string;
   linkText?: string;
   className?: string;
   imageClassName?: string;
   children?: ReactNode;
}>;

export interface ErrorResponse {
   message?: string;
   stack?: string;
}

export type MessageResponse = Readonly<{
   message: string;
}>;

export type PaginatedResult<T> = Readonly<{
   items: T[];
   totalItems: number;
   currentPage: number;
   totalPages: number;
   hasNextPage: boolean;
   hasPreviousPage: boolean;
}>;

export type CustomProps = Readonly<{
   control: Control<any>;
   name: string;
   label?: string;
   placeholder?: string;
   iconSrc?: string;
   iconAlt?: string;
   disabled?: boolean;
   dateFormat?: string;
   showTimeSelect?: boolean;
   children?: React.ReactNode;
   renderSkeleton?: (field: any) => React.ReactNode;
   fieldType: FormFieldType;
   isLimited?: boolean;
   availableTimes?: string[];
   Icon?: FC<{ className?: string; }>;
   doctor?: string;
   showDateText?: string;
}>;

export interface VideoChatProps {
   localStream: MediaStream | null;
   remoteStream: MediaStream | null;
   handleEndCall: () => void;
   toggleMute: () => void;
   toggleVideo: () => void;
   isMuted: boolean;
   isVideoOff: boolean;
   isDoctor: boolean;
   selfAvatar: string;
   remoteAvatar: string;
}

export interface CustomError {
   message: string,
   statusCode?: number;
}

export type AdminDashBoardProps = Readonly<{
   patientGender: ReactNode;
   appointmentStatus: ReactNode;
   users: ReactNode;
   appointments: ReactNode;
   slotUsage: ReactNode;
}>;