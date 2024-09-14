"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/common/CustomFormField";
import SubmitButton from "@/components/common/SubmitButton";
import { appointmentFormValidation } from "@/components/forms/actions/userValidation";
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";
import { AppointmentTypes, PaymentOptions } from "@/constants";
import { FormFieldType } from "@/types/fromTypes";
import { useGetDoctorsList } from "@/lib/hooks/appointment/useAppointment";
import { useGetSlotsOfDoctor } from "@/lib/hooks/slots/useSlot";
import { useEffect, useState } from "react";

const AppointmentForm = () => {
   const { data, isLoading } = useGetDoctorsList()
   const form = useForm<z.infer<typeof appointmentFormValidation>>({
      resolver: zodResolver(appointmentFormValidation),
      defaultValues: {
         appointmentType: "",
         reason: "",
         note: "",
         schedule: new Date(Date.now()),
         payment: "online",
         doctor: "",
      },
   });
   const [slotFilter, setSlotFilter] = useState({
      doctorId: form.getValues().doctor,
      date: new Date(form.getValues().schedule), 
   });
   const { data: slots, isLoading: isGettingSlot } = useGetSlotsOfDoctor(
      slotFilter.doctorId,
      slotFilter.date instanceof Date ? slotFilter.date.toISOString() : "" 
   );
   console.log(slots);
   
   useEffect(() => {
      const subscription = form.watch((values) => {
         const date = values.schedule ? new Date(values.schedule) : new Date();
         setSlotFilter({
            doctorId: values.doctor || "",
            date: date,
         });
      });
   
      return () => subscription.unsubscribe();
   }, [form]);

   const onSubmit = async (values: z.infer<typeof appointmentFormValidation>) => {
      
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
            <section className="mb-12 space-y-4">
               <h1 className="header">New Appointment</h1>
               <p className="text-dark-700">Request New Appointment in 10 seconds</p>
            </section>

            <CustomFormField
               fieldType={FormFieldType.DATE_PICKER}
               control={form.control}
               name="schedule"
               showDateText="Only date after today is valid"
               label="Expected appointment date"
               isLimited
               dateFormat="MM/dd/yyyy"
            />
            
            <CustomFormField
               fieldType={FormFieldType.SELECT}
               control={form.control}
               name="appointmentType"
               label="Appointment Type"
               placeholder="Select an Appointment"
            >
               {AppointmentTypes.map((appointment, i) => (
                  <SelectItem key={appointment.type + i} value={appointment.id}>
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

            <CustomFormField fieldType={FormFieldType.SELECT} control={form.control} name="doctor" label="Doctor">
               {!isLoading && data?.items ? (
                  data.items.map((doctor) => (
                     <SelectItem key={doctor._id} value={doctor._id!}>
                        <div className="flex cursor-pointer items-center gap-2">
                           {doctor.image && (
                              <Image
                                 src={doctor.image}
                                 width={25}
                                 height={25}
                                 alt={doctor.name!}
                                 className="rounded-full border border-dark-500"
                              />
                           )}
                           <p>{doctor.name}</p>
                        </div>
                     </SelectItem>
                  ))
               ) : (
                  <p>Loading doctors...</p>
               )}
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
