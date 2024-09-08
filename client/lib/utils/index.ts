import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}


export const getDefault = (value: any, fallback: string) => {
   return value ? value : fallback;
 };