"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import 'react-phone-number-input/style.css'
import { Input } from "@/components/ui/input";
import { CustomProps, FormFieldType } from "@/types/fromTypes";
import Image from "next/image";
import PhoneInput from 'react-phone-number-input'




const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, iconSrc, iconAlt, placeholder } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              width={24}
              height={24}
              className="ml-2"
              alt={iconAlt || "icon"}
            />
          )}
          <FormControl>
            <Input
              {...field}
              placeholder={placeholder}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
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

    case FormFieldType.PASSWORD:
      return (
        <div className="flex rounded-md border-dark-500 bg-dark-400">
          <FormControl>
            <Input
              type="password"
              {...field}
              placeholder={placeholder}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );

    default:
      return null;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
