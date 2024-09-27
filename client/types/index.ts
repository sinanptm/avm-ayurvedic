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

