'use client';

import { useGetAppointmentSuccessPageDetails } from "@/lib/hooks/appointment/useAppointmentPatient";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { XCircle, Calendar, User, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from 'date-fns';
import { BreadcrumbCollapsed } from "@/components/navigation/BreadCrumbs";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function AppointmentSuccessPage() {
  const paymentId = useParams().id as string;
  const { data: appointment, isLoading, error } = useGetAppointmentSuccessPageDetails(paymentId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 flex flex-col items-center justify-center p-4 text-foreground">
      <BreadcrumbCollapsed  items={[{ href: "/", label: "Home" }, { href: "/new-appointment", label: "New Appointment" }, { href: `/new-appointment/${paymentId}`, label: "Appointment Status" }]} />
      <Link href="/" className="mb-8 transition-transform hover:scale-105 mt-7">
        <Image
          src="/assets/icons/logo-full.svg"
          width={200}
          height={50}
          alt="AVM Ayurveda Logo"
          className="h-12 w-auto"
        />
      </Link>

      <Card className="w-full max-w-lg bg-card text-card-foreground rounded-xl shadow-2xl overflow-hidden">
        <CardHeader className="bg-primary/10 p-6">
          <h2 className="text-2xl font-bold text-center text-primary">Appointment Status</h2>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {error ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <XCircle className="w-16 h-16 mx-auto text-destructive mb-4" />
              <h2 className="text-xl font-semibold mb-2">Oops! Something went wrong</h2>
              <p className="text-muted-foreground mb-4">
                {error?.response?.data?.message ||
                  "We couldn't fetch your appointment details. Please try again later."}
              </p>
              <Button asChild variant="destructive">
                <Link href="/new-appointment">Try Booking Again</Link>
              </Button>
            </motion.div>
          ) : (
            <>
              <section className="flex flex-col items-center">
                {isLoading ? (
                  <Skeleton className="w-[300px] h-[280px] rounded-md" />
                ) : (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={"/assets/gifs/success.gif"}
                      className="w-auto h-auto rounded-lg"
                      unoptimized
                      priority
                      width={300}
                      height={280}
                      alt="Success"
                    />
                  </motion.div>
                )}
                <h2 className="text-xl font-semibold mt-6 mb-4 max-w-[600px] text-center">
                  {isLoading ? (
                    <Skeleton className="h-6 w-3/4 mx-auto" />
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
                      <Skeleton className="w-10 h-10 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : appointment ? (
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex items-center gap-4 bg-primary/5 p-3 rounded-lg">
                    <Calendar className="w-10 h-10 text-primary" />
                    <div>
                      <p className="font-medium">Appointment Date</p>
                      <p className="text-sm text-muted-foreground">
                        {format(appointment.appointmentDate!, "PPPP")} , {appointment.slot?.startTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-primary/5 p-3 rounded-lg">
                    <User className="w-10 h-10 text-primary" />
                    <div>
                      <p className="font-medium">Doctor</p>
                      <p className="text-sm text-muted-foreground">{appointment.doctor?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-primary/5 p-3 rounded-lg">
                    <Stethoscope className="w-10 h-10 text-primary" />
                    <div>
                      <p className="font-medium">Appointment Type</p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {appointment.appointmentType!.replace("-", " ")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Appointment details are not available at the moment. If this persists, please contact
                    support.
                  </p>
                </div>
              )}
            </>
          )}
        </CardContent>
        {!isLoading && !error && (
          <CardFooter className="flex justify-center space-x-4 p-6 bg-primary/5">
            <Button variant="default" asChild>
              <Link href={`/appointments/${appointment?._id}`}>Show Details</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/new-appointment">Book Another Appointment</Link>
            </Button>
          </CardFooter>
        )}
      </Card>

      <p className="mt-8 text-sm text-muted-foreground">© 2024 AVM Ayurveda</p>
    </div>
  );
}