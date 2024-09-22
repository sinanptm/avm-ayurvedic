import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export const getDefault = (value: any, fallback: string) => {
   return value ? value : fallback;
};

export const formatDate = (date: Date): string => {
   const day = String(date.getDate()).padStart(2, "0");
   const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
   const year = date.getFullYear();
   return `${day}/${month}/${year}`;
};
