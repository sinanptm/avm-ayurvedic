import React, { memo } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import "react-phone-number-input/style.css";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "@/components/ui/input";
import { CustomProps } from "@/types";
import { FormFieldType } from "@/types/enum";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";
import ReactDatePicker from "react-datepicker";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
   const {
      fieldType,
      iconSrc,
      iconAlt,
      placeholder,
      renderSkeleton,
      label,
      name,
      isLimited,
      disabled,
      children,
      dateFormat,
      Icon,
      showDateText,
   } = props;

   const renderIcon = () => {
      if (Icon) {
         return <Icon className="ml-2 mt-1" />;
      } else if (iconSrc) {
         return <Image src={iconSrc} alt={iconAlt || `${name}-icon`} height={24} width={24} className="ml-2" />;
      }
      return null;
   };

   switch (fieldType) {
      case FormFieldType.INPUT:
         return (
            <div className="flex rounded-md border border-dark-500 bg-dark-400">
               {renderIcon()}
               <FormControl>
                  <Input placeholder={placeholder} {...field} className="shad-input border-0" />
               </FormControl>
            </div>
         );

      case FormFieldType.DATE_PICKER:
         return (
            <div className="flex rounded-md border border-dark-500 bg-dark-400">
               <Image src={"/assets/icons/calendar.svg"} alt="Calendar" width={22} height={22} className="ml-2 mt-1" />
               <FormControl>
                  <ReactDatePicker
                     showTimeSelect={props.showTimeSelect ?? false}
                     selected={field.value}
                     onChange={(date) => field.onChange(date)}
                     timeInputLabel="Time:"
                     dateFormat={dateFormat ?? "dd/MM/yyyy"}
                     wrapperClassName="date-picker"
                     {...(isLimited ? { minDate: new Date() } : {})}
                  >
                     <div className="text-red-700">{showDateText}</div>
                  </ReactDatePicker>
               </FormControl>
            </div>
         );

      case FormFieldType.SELECT:
         return (
            <FormControl>
               <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="shad-select-trigger">
                     <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent className="shad-select-content">{children}</SelectContent>
               </Select>
            </FormControl>
         );

      case FormFieldType.PHONE_INPUT:
         return (
            <FormControl>
               <PhoneInput
                  placeholder={placeholder}
                  defaultCountry="IN"
                  {...field}
                  international
                  addInternationalOption
                  className="input-phone"
               />
            </FormControl>
         );

      case FormFieldType.TEXTAREA:
         return (
            <FormControl>
               <Textarea placeholder={placeholder} {...field} className="shad-textArea" disabled={disabled} />
            </FormControl>
         );

      case FormFieldType.PASSWORD:
         return (
            <div className="flex rounded-md border-dark-500 bg-dark-400">
               <Image src={"/assets/icons/password.svg"} alt={"Password"} height={24} width={24} className="ml-2" />
               <FormControl>
                  <Input
                     type="password"
                     {...field}
                     placeholder={placeholder}
                     autoComplete=""
                     className="shad-input border-0"
                  />
               </FormControl>
            </div>
         );

      case FormFieldType.SKELETON:
         return renderSkeleton ? renderSkeleton(field) : null;

      case FormFieldType.CHECKBOX:
         return (
            <div className="flex items-center gap-4">
               <Checkbox id={name} checked={field.value} onCheckedChange={field.onChange} />
               <label htmlFor={name} className="checkbox-label">
                  {label}
               </label>
            </div>
         );

      default:
         return null;
   }
};

const CustomFormField: React.FC<CustomProps> = (props) => {
   const { control, fieldType, name, label } = props;
   return (
      <FormField
         control={control}
         name={name}
         render={({ field }) => (
            <FormItem className="flex-1">
               {fieldType !== FormFieldType.CHECKBOX && label && <FormLabel>{label}</FormLabel>}
               <RenderField field={field} props={props} />
               <FormMessage className="shad-error" />
            </FormItem>
         )}
      />
   );
};

export default memo(CustomFormField);
