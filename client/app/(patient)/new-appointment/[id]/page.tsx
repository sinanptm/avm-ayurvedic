"use client";

import { useGetAppointmentSuccessPageDetails } from "@/lib/hooks/appointment/useAppointmentPatient";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import { XCircle } from "lucide-react";
import { ButtonV2 } from "@/components/common/ButtonV2";

export default function AppointmentSuccessPage() {
   const paymentId = useParams().id as string;
   const { data: appointment, isLoading, isError, error } = useGetAppointmentSuccessPageDetails(paymentId);

   const formatDate = (dateString: string) => {
      return format(new Date(dateString), "MMMM d, yyyy");
   };

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
            {error ? (
               <div className="text-center">
                  <XCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Oops! Something went wrong</h2>
                  <p className="text-muted-foreground mb-4">
                     {error?.response?.data?.message ||
                        "We couldn't fetch your appointment details. Please try again later."}
                  </p>
                  <ButtonV2 asChild>
                     <Link href="/new-appointment">Try Booking Again</Link>
                  </ButtonV2>
               </div>
            ) : (
               <>
                  <section className="flex flex-col items-center">
                     {isLoading ? (
                        <Skeleton className="w-[300px] h-[280px] rounded-md bg-slate-500" />
                     ) : (
                        <Image
                           src={"/assets/gifs/success.gif"}
                           className="w-auto h-auto"
                           priority
                           width={300}
                           height={280}
                           alt="Success"
                        />
                     )}
                     <h2 className="header mb-6 max-w-[600px] text-center">
                        {isLoading ? (
                           <Skeleton className="h-6 w-3/4 mx-auto bg-slate-500" />
                        ) : (
                           <>
                              Your <span className="text-green-500">Appointment request</span> has been successfully
                              submitted! We will be in touch shortly to confirm.
                           </>
                        )}
                     </h2>
                  </section>

                  {isLoading ? (
                     <div className="space-y-4">
                        {[...Array(3)].map((_, index) => (
                           <div key={index} className="flex items-center gap-3">
                              <Skeleton className="w-6 h-6 rounded-full bg-slate-500" />
                              <div className="space-y-2 flex-1">
                                 <Skeleton className="h-4 w-24 bg-slate-500" />
                                 <Skeleton className="h-3 w-32 bg-slate-500" />
                              </div>
                           </div>
                        ))}
                     </div>
                  ) : appointment ? (
                     <div className="space-y-4">
                        <div className="flex items-center gap-3">
                           <Image src="/assets/icons/calendar.svg" width={24} height={24} alt="Calendar" />
                           <div>
                              <p className="font-medium">Appointment Date</p>
                              <p className="text-sm text-muted-foreground">
                                 {formatDate(appointment.appointmentDate!)} , {appointment.slot?.startTime}
                              </p>
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
                              <p className="text-sm text-muted-foreground capitalize">
                                 {appointment.appointmentType!.replace("-", " ")}
                              </p>
                           </div>
                        </div>
                     </div>
                  ) : (
                     <div className="text-center">
                        <p className="text-muted-foreground mb-4">
                           Appointment details are not available at the moment. If this persists, please contact
                           support.
                        </p>
                     </div>
                  )}

                  {!isLoading && (
                     <div className="flex justify-center space-x-2">
                        <ButtonV2 variant={"gooeyLeft"} asChild>
                           <Link href={`/appointments/${appointment?._id}`}>Show Details</Link>
                        </ButtonV2>
                        <ButtonV2 variant={"shine"} asChild>
                           <Link href="/new-appointment">Book Another Appointment</Link>
                        </ButtonV2>
                     </div>
                  )}
               </>
            )}
         </div>

         <p className="mt-8 text-sm text-muted-foreground">© 2024 AVM Ayurveda</p>
      </div>
   );
}
