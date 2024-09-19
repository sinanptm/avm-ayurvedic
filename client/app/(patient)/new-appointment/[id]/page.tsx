'use client'

import { Button } from "@/components/ui/button"
import { useGetAppointmentDetailsPatient } from "@/lib/hooks/appointment/useAppointmentPatient"
import Image from "next/image"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { format } from 'date-fns'

export default function AppointmentSuccessPage() {
   const id = useParams().id as string
   const { data: appointment } = useGetAppointmentDetailsPatient(id)

   const isCreatedBeforeTwoMinutes = () => {
      if (!appointment?.createdAt) return false
      const createdAtDate = new Date(appointment.createdAt)
      const now = new Date()
      const timeDifference = (now.getTime() - createdAtDate.getTime()) / 1000 / 60 
      return timeDifference > 2
   }

   const formatDate = (dateString: string) => {
      return format(new Date(dateString), "MMMM d, yyyy")
   }

   if (!isCreatedBeforeTwoMinutes()) {
      notFound();
   }

   return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
         <Link href="/" className="mb-8">
            <Image
               src="/assets/icons/logo-full.svg"
               width={200}
               height={50}
               alt="AVM Ayurveda Logo"
               className="h-10 w-auto"
            />
         </Link>

         <div className="w-full max-w-md bg-card text-card-foreground rounded-lg shadow-lg p-6 space-y-6">
            <section className="flex flex-col items-center">
               <Image
                  src={"/assets/gifs/success.gif"}
                  className="w-auto h-auto"
                  priority
                  width={300}
                  height={280}
                  alt="Success"
               />
               <h2 className="header mb-6 max-w-[600px] text-center">
                  Your <span className="text-green-500">Appointment request</span> has been successfully submitted! We will be in touch shortly to confirm.
               </h2>
            </section>

            {appointment && (
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                     <Image src="/assets/icons/calendar.svg" width={24} height={24} alt="Calendar" />
                     <div>
                        <p className="font-medium">Appointment Date</p>
                        <p className="text-sm text-muted-foreground">{formatDate(appointment.appointmentDate!)} , {appointment.slot?.startTime}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <Image src={appointment.doctor?.image!} width={24} height={24} alt="Doctor" />
                     <div>
                        <p className="font-medium">Doctor</p>
                        <p className="text-sm text-muted-foreground">{appointment.doctor?.name}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-3">
                     <Image src="/assets/icons/stethoscope.svg" width={24} height={24} alt="Appointment Type" />
                     <div>
                        <p className="font-medium">Appointment Type</p>
                        <p className="text-sm text-muted-foreground capitalize">{appointment.appointmentType!.replace('-', ' ')}</p>
                     </div>
                  </div>
               </div>
            )}

            <div className="flex justify-center">
               <Button asChild>
                  <Link href="/new-appointment">Book Another Appointment</Link>
               </Button>
            </div>
         </div>

         <p className="mt-8 text-sm text-muted-foreground">© 2024 AVM Ayurveda</p>
      </div>
   )
}
