'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/common/CustomFormField";
import SubmitButton from "@/components/common/SubmitButton";
import { appointmentFormValidation } from "@/components/forms/actions/userValidation";
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";
import { AppointmentTypes } from "@/constants";
import { FormFieldType } from "@/types/fromTypes";
import { useVerifyPaymentAppointment, useCreateAppointment, useGetDoctorsList } from "@/lib/hooks/appointment/useAppointmentDoctor";
import { useGetSlotsOfDoctor } from "@/lib/hooks/slots/useSlot";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { AppointmentType } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import loadRazorpayScript from '@/lib/utils/loadRazorpayScript'

declare global {
   interface Window {
      Razorpay: any;
   }
}

const AppointmentForm = () => {
   const { data: doctorsData, isLoading: isDoctorsLoading } = useGetDoctorsList();
   const { mutate: verifyPayment } = useVerifyPaymentAppointment();
   const [isDoctorSelected, setIsDoctorSelected] = useState(false);
   const { mutate: createAppointment, isPending } = useCreateAppointment();
   const query = useQueryClient();

   const form = useForm<z.infer<typeof appointmentFormValidation>>({
      resolver: zodResolver(appointmentFormValidation),
      defaultValues: {
         appointmentType: "",
         reason: "",
         note: "",
         date: new Date(),
         doctor: "",
         slotId: "",
      },
   });

   const [slotFilter, setSlotFilter] = useState({
      doctorId: "",
      date: new Date(),
   });

   const { data: slots, isLoading: isSlotsLoading } = useGetSlotsOfDoctor(
      slotFilter.doctorId,
      slotFilter.date instanceof Date ? slotFilter.date.toISOString() : ""
   );

   useEffect(() => {
      const subscription = form.watch((value, { name }) => {
         if (name === 'doctor' && value.doctor) {
            setIsDoctorSelected(true);
         }
         setSlotFilter({
            doctorId: value.doctor || "",
            date: value.date ? new Date(value.date) : new Date(),
         });
      });

      return () => subscription.unsubscribe();
   }, [form]);

   const onSubmit = async (formData: z.infer<typeof appointmentFormValidation>) => {
      createAppointment(
         {
            appointment: {
               appointmentDate: formData.date as unknown as string,
               doctorId: formData.doctor,
               slotId: formData.slotId,
               notes: formData.note,
               reason: formData.reason,
               appointmentType: formData.appointmentType as AppointmentType,
            },
         },
         {
            onSuccess: async ({ appointmentId, orderId, patient }) => {
               toast({
                  title: "Appointment Created",
                  description: "Redirecting to payment...",
                  variant: "success",
               });
               const isRazorpayLoaded = await loadRazorpayScript();
               if (!isRazorpayLoaded) {
                  toast({
                     title: "Payment Error",
                     description: "Razorpay SDK failed to load. Please try again.",
                     variant: "destructive",
                  });
                  return;
               }

               const paymentOptions = {
                  key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                  amount: 300 * 100,
                  currency: "INR",
                  name: patient.name,
                  description: "Appointment Payment",
                  image:patient.profile||"",
                  order_id: orderId,
                  handler: async function (response: { razorpay_order_id: string, razorpay_payment_id: string, razorpay_signature: string }) {
                     verifyPayment({
                        data: {
                           appointmentId,
                           paymentData: {
                              razorpay_order_id: response.razorpay_order_id,
                              razorpay_payment_id: response.razorpay_payment_id,
                              razorpay_signature: response.razorpay_signature,
                           }
                        }
                     });
                     toast({
                        title: "Payment Success",
                        description: "Your payment was successful and the appointment is confirmed. We will notify you once doctor approve you slot.",
                        variant: "success",
                     });
                  },
                  prefill: {
                     name: patient.name,
                     email: patient.email,
                     contact: patient.phone,
                  },
                  notes:{
                     address:"Razorpay Corporate Office"
                  },
                  theme: {
                     color: "#3399cc",
                  },
               };

               const paymentObject = new window.Razorpay(paymentOptions);
               paymentObject.open();
            },
            onError(error) {
               const message =
                  error?.response?.status === 403
                     ? "This action is only allowed for verified users."
                     : error.response?.data.message || "Appointment creation failed. Please try again.";
               toast({
                  title: "Appointment Creation Failed ❌",
                  description: message,
                  variant: "destructive",
               });
            },
         }
      );
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 m">
            <section className="mb-12 space-y-4">
               <h1 className="text-2xl font-bold text-gray-200">New Appointment</h1>
               <p className="text-gray-400">Request New Appointment in 10 seconds</p>
            </section>

            <CustomFormField
               fieldType={FormFieldType.DATE_PICKER}
               control={form.control}
               showTimeSelect={false}
               name="date"
               showDateText="Appointment date must be in the future"
               label="Expected appointment date *" 
               isLimited
               dateFormat="dd/MM/yyyy"
            />

            <CustomFormField
               fieldType={FormFieldType.SELECT}
               control={form.control}
               name="appointmentType"
               label="Appointment Type *"
               placeholder="Select an Appointment"
            >
               {AppointmentTypes.map((appointment, i) => (
                  <SelectItem key={appointment.id + i} value={appointment.id}>
                     <div className="flex cursor-pointer items-center gap-2">
                        <Image
                           src={appointment.image}
                           width={25}
                           height={25}
                           alt={appointment.type}
                           className="rounded-full border border-gray-600"
                        />
                        <p className="text-gray-200">{appointment.type}</p>
                     </div>
                  </SelectItem>
               ))}
            </CustomFormField>

            <CustomFormField
               fieldType={FormFieldType.SELECT}
               control={form.control}
               name="doctor"
               label="Doctor *"
            >
               {!isDoctorsLoading && doctorsData?.items ? (
                  doctorsData.items.map((doctor) => (
                     <SelectItem key={doctor._id} value={doctor._id!}>
                        <div className="flex cursor-pointer items-center gap-2">
                           {doctor.image && (
                              <Image
                                 src={doctor.image}
                                 width={25}
                                 height={25}
                                 alt={doctor.name!}
                                 className="rounded-full border border-gray-600"
                              />
                           )}
                           <p className="text-gray-200">{doctor.name}</p>
                        </div>
                     </SelectItem>
                  ))
               ) : (
                  <p className="text-gray-400">Loading doctors...</p>
               )}
            </CustomFormField>

            <FormField
               control={form.control}
               name="slotId"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel className="text-gray-200">Time Slot *</FormLabel>
                     {isDoctorSelected && (
                        <div className="space-y-3 p-3 rounded-lg shadow-md border-2 border-gray-400">
                           <h3 className="text-base font-semibold text-gray-200">
                              Available Time Slots for {formatDate(slotFilter.date)}
                           </h3>
                           {isSlotsLoading ? (
                              <div className="flex items-center justify-center h-20">
                                 <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
                              </div>
                           ) : slots && slots.length > 0 ? (
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                                 {slots.map((slot) => (
                                    <Button
                                       type="button"
                                       key={slot._id}
                                       variant="ghost"
                                       onClick={() => form.setValue('slotId', slot._id!, { shouldValidate: true })}
                                       className={`w-full justify-center py-1 px-2 text-xs font-medium transition-all duration-200 border ${field.value === slot._id
                                          ? 'bg-primary text-primary-foreground border-primary shadow-md scale-105'
                                          : 'bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600 hover:text-gray-100'
                                          }`}
                                    >
                                       {slot.startTime} - {slot.endTime}
                                    </Button>
                                 ))}
                              </div>
                           ) : (
                              <div className="flex items-center justify-center h-20 text-sm text-gray-400">
                                 No available slots for the selected date and doctor.
                              </div>
                           )}
                        </div>
                     )}
                     <FormMessage className="text-red-500" />
                  </FormItem>
               )}
            />

            <div className="flex flex-col gap-6 xl:flex-row">
               <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="reason"
                  label="Reason for Appointment *"
                  placeholder="Annual monthly check-up"
               />
               <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="note"
                  label="Any Notes"
                  placeholder="Please schedule before evening"
               />
            </div>

            <SubmitButton isLoading={isPending}>Submit</SubmitButton>
         </form>
      </Form>
   );
};

export default AppointmentForm;
