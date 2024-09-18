'use client';

import { useGetAppointmentDetailsDoctor } from "@/lib/hooks/appointment/useAppointmentDoctor";
import { Dispatch, SetStateAction } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { AppointmentStatus } from "@/types";

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  appointmentId: string;
};

export default function AppointmentDetailsModelDoctor({ isOpen, setIsOpen, appointmentId }: Props) {
  const { data: appointment, isLoading, error } = useGetAppointmentDetailsDoctor(appointmentId);

  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="max-w-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold">Appointment Details</AlertDialogTitle>
          <AlertDialogDescription>
            View the details of the selected appointment.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            <p>Error loading appointment details. Please try again.</p>
          </div>
        ) : appointment ? (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Image
                src={appointment.patient!.profile! || "/placeholder.svg?height=80&width=80"}
                alt={appointment.patient!.name!}
                width={80}
                height={80}
                className="rounded-full"
              />
              <div>
                <h3 className="text-xl font-semibold">{appointment.patient!.name!}</h3>
                <p className="text-muted-foreground">{appointment.patient!.email!}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Date:</span>
                    <span>{new Date(appointment.appointmentDate!).toLocaleString().split(",")[0]}, {appointment.slot!.startTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Type:</span>
                    <span className="capitalize">{appointment.appointmentType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Status:</span>
                    <Badge variant={appointment.status === AppointmentStatus.PENDING ? "warning" : "success"}>
                      {appointment.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Patient Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Phone:</span>
                    <span>{appointment.patient!.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Gender:</span>
                    <span>{appointment.patient!.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Blood Group:</span>
                    <span>{appointment.patient!.bloodGroup}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Appointment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <span className="font-medium">Reason:</span>
                  <p className="mt-1">{appointment.reason}</p>
                </div>
                <div>
                  <span className="font-medium">Notes:</span>
                  <p className="mt-1">{appointment.notes}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            <p>No appointment details found.</p>
          </div>
        )}

        <AlertDialogFooter className="flex justify-between">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          {appointment && appointment.status === AppointmentStatus.PENDING && (
            <div className="space-x-2">
              <Button variant="destructive">Reject</Button>
              <Button variant="success">Accept</Button>
            </div>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}