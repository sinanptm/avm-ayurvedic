import { Control } from "react-hook-form";

export  enum FormFieldType {
    INPUT = "input",
    SELECT = "select",
    CHECKBOX = "checkbox",
    DATE_PICKER = "date-picker",
    TIME_PICKER = "time-picker",
    SKELTON = "skelton",
    TEXTAREA = "textarea",
    RADIO = "radio",
    SWITCH = "switch",
    PHONE_INPUT = "phone",
    PASSWORD = "password",
  }

  export interface CustomProps {
    control: Control<any>;
    fieldType: FormFieldType;
    name: string;
    label?: string;
    placeholder?: string;
    iconSrc?: string;
    iconAlt?: string;
    disabled?: boolean;
    errorMessage?: string;
    dateFormat?: string;
    showTime?: boolean;
    children?: React.ReactNode;
    renderSkeleton?: (field: any) => React.ReactNode;
  }