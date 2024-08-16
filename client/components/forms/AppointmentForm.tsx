"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { loginFormValidation } from "@/lib/userValidation";
import { useLoginMutation } from "@/lib/features/api/authApi";
import { FormFieldType } from "@/types/fromTypes";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { AppointmentTypes, PaymentOptions } from "@/constants";

const AppointmentForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [login] = useLoginMutation();
  const form = useForm<z.infer<typeof loginFormValidation>>({
    resolver: zodResolver(loginFormValidation),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormValidation>) => {
    console.log("clicked");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">New Appointment</h1>
          <p className="text-dark-700">Request New Appointment in 10 seconds</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="appointmentType"
          label="Appointment Type"
          placeholder="Select an Appointment"
        >
          {AppointmentTypes.map((appointment, i) => (
            <SelectItem key={appointment.type + i} value={appointment.type}>
              <div className="flex cursor-pointer items-center gap-2">
                <Image
                  src={appointment.image}
                  width={25}
                  height={25}
                  alt={appointment.type}
                  className="rounded-full border border-dark-500"
                />
                <p>{appointment.type}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <div className={`flex flex-col gap-6  xl:flex-row`}>
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="reason"
            label="Reason for Appointment"
            placeholder="Annual monthly check-up"
          />

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="Symptoms"
            label="Symptoms"
            placeholder="Having Headache while sleeping"
          />
        </div>

        <CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name="schedule"
          label="Expected appointment date"
          isLimited
          dateFormat="MM/dd/yyyy  -  h:mm aa"
        />
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="payment"
          label="Payment Options"
          placeholder="Available Options"
        >
          {PaymentOptions.map((appointment, i) => (
            <SelectItem key={appointment + i} value={appointment}>
              <div className="flex cursor-pointer items-center gap-2">
                <p>{appointment}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <SubmitButton isLoading={isLoading}>Sign In</SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
