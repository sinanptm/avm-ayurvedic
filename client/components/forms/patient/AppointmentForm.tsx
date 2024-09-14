'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomFormField from "@/components/common/CustomFormField"
import SubmitButton from "@/components/common/SubmitButton"
import { appointmentFormValidation } from "@/components/forms/actions/userValidation"
import { SelectItem } from "@/components/ui/select"
import Image from "next/image"
import { AppointmentTypes, PaymentOptions } from "@/constants"
import { FormFieldType } from "@/types/fromTypes"
import { useGetDoctorsList } from "@/lib/hooks/appointment/useAppointment"
import { useGetSlotsOfDoctor } from "@/lib/hooks/slots/useSlot"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const AppointmentForm = () => {
   const { data, isLoading } = useGetDoctorsList()
   const [isDoctorSelected, setIsDoctorSelected] = useState(false)

   const form = useForm<z.infer<typeof appointmentFormValidation>>({
      resolver: zodResolver(appointmentFormValidation),
      defaultValues: {
         appointmentType: "",
         reason: "",
         note: "",
         date: new Date(Date.now()),
         payment: "online",
         doctor: "",
         slot: "",
      },
   })

   const [slotFilter, setSlotFilter] = useState({
      doctorId: "",
      date: new Date(),
   })

   const { data: slots, isLoading: isGettingSlot } = useGetSlotsOfDoctor(
      slotFilter.doctorId,
      slotFilter.date instanceof Date ? slotFilter.date.toISOString() : ""
   )

   useEffect(() => {
      const subscription = form.watch((value, { name }) => {
         if (name === 'doctor' && value.doctor) {
            setIsDoctorSelected(true)
         }
         setSlotFilter({
            doctorId: value.doctor || "",
            date: value.date ? new Date(value.date) : new Date(),
         })
      })

      return () => subscription.unsubscribe()
   }, [form])

   const onSubmit = async (values: z.infer<typeof appointmentFormValidation>) => {
      console.log(values)
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
            <section className="mb-12 space-y-4">
               <h1 className="text-2xl font-bold text-gray-200">New Appointment</h1>
               <p className="text-gray-400">Request New Appointment in 10 seconds</p>
            </section>

            <CustomFormField
               fieldType={FormFieldType.DATE_PICKER}
               control={form.control}
               name="date"
               showDateText="Appointment date must be in the future"
               label="Expected appointment date"
               isLimited
               dateFormat="dd/MM/yyyy"
            />

            <CustomFormField
               fieldType={FormFieldType.SELECT}
               control={form.control}
               name="appointmentType"
               label="Appointment Type"
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
               label="Doctor"
            >
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
               name="slot"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel className="text-gray-200">Time Slot</FormLabel>
                     {isDoctorSelected && (
                        <div className="space-y-3 p-3 rounded-lg shadow-md border-2 border-gray-400">
                           <h3 className="text-base font-semibold text-gray-200">Available Time Slots for {formatDate(slotFilter.date)}</h3>
                           {isGettingSlot ? (
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
                                       onClick={() => form.setValue('slot', slot._id!, { shouldValidate: true })}
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
                  label="Reason for Appointment"
                  placeholder="Annual monthly check-up"
               />

               <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="note"
                  label="Note"
                  placeholder="Please schedule before evening"
               />
            </div>

            <CustomFormField
               fieldType={FormFieldType.SELECT}
               control={form.control}
               name="payment"
               label="Payment Options"
               placeholder="Available Options"
            >
               {PaymentOptions.map((option, i) => (
                  <SelectItem key={option + i} value={option}>
                     <div className="flex cursor-pointer items-center gap-2">
                        <p className="text-gray-200">{option}</p>
                     </div>
                  </SelectItem>
               ))}
            </CustomFormField>

            <SubmitButton isLoading={false}>Submit</SubmitButton>
         </form>
      </Form>
   )
}

export default AppointmentForm