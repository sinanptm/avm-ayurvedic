import { ReactNode } from "react";

export interface SearchInputProps {
   placeHolder: string;
   name?: string;
   onChange?: () => void;
}

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
