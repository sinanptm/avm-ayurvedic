import { FC, FormEvent, ReactNode } from "react";
import { Control } from "react-hook-form";
import { FormFieldType } from "./enum";

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

export interface CustomProps {
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
}

export interface OtpFromProps {
   handleVerify: (e: FormEvent) => void;
   handleResend: () => void;
   timer: number;
   isLoading: boolean;
   otp: string;
   setOtp: (value: string) => void;
}

