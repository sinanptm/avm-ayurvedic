"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/utils/CustomFormField";
import SubmitButton from "@/components/utils/SubmitButton";
import { appointmentFormValidation } from "@/lib/userValidation";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { AppointmentTypes, DoctorList, PaymentOptions } from "@/constants";
import { FormFieldType } from "@/types/fromTypes";

const AppointmentForm = () => {
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const form = useForm<z.infer<typeof appointmentFormValidation>>({
      resolver: zodResolver(appointmentFormValidation),
      defaultValues: {
         appointmentType: "inpatient",
         reason: "",
         note: "",
         schedule: new Date(Date.now()),
         payment: "online",
         doctor: "Shafeek",
      },
   });

   const onSubmit = async (
      values: z.infer<typeof appointmentFormValidation>,
   ) => {
      setIsLoading(true);
      console.log("clicked", values);
      setIsLoading(false);
   };

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 flex-1"
         >
            <section className="mb-12 space-y-4">
               <h1 className="header">New Appointment</h1>
               <p className="text-dark-700">
                  Request New Appointment in 10 seconds
               </p>
            </section>

            <CustomFormField
               fieldType={FormFieldType.SELECT}
               control={form.control}
               name="appointmentType"
               label="Appointment Type"
               placeholder="Select an Appointment"
            >
               {AppointmentTypes.map((appointment, i) => (
                  <SelectItem
                     key={appointment.type + i}
                     value={appointment.type}
                  >
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

            <CustomFormField
               fieldType={FormFieldType.SELECT}
               control={form.control}
               name="doctor"
               label="Doctor"
            >
               {DoctorList.map(doctor => (
                  <SelectItem key={doctor._id} value={doctor.name}>
                     <div className="flex cursor-pointer items-center gap-2">
                        <Image
                           src={doctor.image}
                           width={25}
                           height={25}
                           alt={doctor.name}
                           className="rounded-full border border-dark-500"
                        />
                        <p>{doctor.name}</p>
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
                  name="note"
                  label="Note"
                  placeholder="Please schedule before evening "
               />
            </div>

            <CustomFormField
               fieldType={FormFieldType.DATE_PICKER}
               control={form.control}
               name="schedule"
               label="Expected appointment date"
               isLimited
               dateFormat="MM/dd/yyyy"
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
