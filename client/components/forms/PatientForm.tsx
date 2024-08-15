"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { userFormValidation } from "@/lib/validation";
import { useState } from "react";

export enum FormFieldType {
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
}

const PatientForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof userFormValidation>>({
    resolver: zodResolver(userFormValidation),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const  onSubmit = async({name,phone}: z.infer<typeof userFormValidation>)=> {
    setIsLoading(true);
    try {
      // const user = await createUser(email, name, phone);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <section className="mb-12 space-y-4">
          <h1 className="header">Welcome Back 👋</h1>
          <p className="text-dark-700">Schedule your first appointment</p>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Full Name"
          placeholder="john doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PHONE_INPUT}
          name="phone"
          label="Phone Number"
        />

        <SubmitButton isLoading={false}>Get Started </SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
