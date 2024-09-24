"use client";

import {
   useGetAppointmentDetailsPatient,
   useUpdateAppointmentStatusAndNotesPatient,
} from "@/lib/hooks/appointment/useAppointmentPatient";
import { notFound, useParams } from "next/navigation";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GetStatusBadge from "@/components/page-components/doctor/appointment/GetStatusBadge";
import { Calendar, Clock, FileText, Video, User, Mail, Phone, Edit2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { toast } from "@/components/ui/use-toast";
import ConfirmCancelAppointmentModelPatient from "@/components/models/appointment/ConfirmCancelAppointmentPatient";
import { AppointmentStatus } from "@/types";

const Page = () => {
   const id = useParams().id as string;
   const [isEditingNote, setIsEditingNote] = useState(false);
   const [isCancelModelOpen, setCancelModelOpen] = useState(false);
   const { data: appointment, refetch } = useGetAppointmentDetailsPatient(id);
   const { mutate: update, isPending } = useUpdateAppointmentStatusAndNotesPatient();
   const [newNote, setNewNote] = useState("");
   const { patientToken } = useAuth();

   const handleUpdateNote = async () => {
      if (newNote.trim()) {
         update(
            { appointmentId: id, status: appointment?.status!, notes: newNote },
            {
               onSuccess: () => {
                  toast({
                     title: "Note Updated 🎉",
                     description: "Your note has been successfully updated!",
                     variant: "success",
                  });
                  setIsEditingNote(false);
                  refetch();
               },
               onError: () => {
                  toast({
                     title: "Error 😞",
                     description: "Something went wrong while updating the note. Please try again.",
                     variant: "destructive",
                  });
               },
            }
         );
      } else {
         toast({
            title: "Invalid Input 🚫",
            description: "Note cannot be empty. Please enter some text.",
            variant: "warning",
         });
      }
   };

   const handleCancelAppointment = async () => {
      update(
         { appointmentId: id, status: AppointmentStatus.CANCELLED, notes: appointment?.notes! },
         {
            onSuccess: () => {
               toast({
                  title: "Appointment Cancelled 🛑",
                  description: "Your appointment has been successfully cancelled.",
                  variant: "success",
               });
               refetch();
               setCancelModelOpen(false);
            },
            onError: () => {
               toast({
                  title: "Error Cancelling 😞",
                  description: "Something went wrong while cancelling the appointment. Please try again.",
                  variant: "destructive",
               });
            },
         }
      );
   };

   const isCancellable = () => {
      if (!appointment?.slot?.startTime || !appointment?.appointmentDate) return false;

      const appointmentDate = new Date(appointment.appointmentDate);
      const [hours, minutes] = appointment.slot.startTime.split(":");
      const isPM = appointment.slot.startTime.includes("PM");

      appointmentDate.setHours(isPM ? parseInt(hours) + 12 : parseInt(hours), parseInt(minutes.split(" ")[0]));

      const currentTime = new Date();
      const threeHoursBefore = new Date(appointmentDate.getTime() - 3 * 60 * 60 * 1000);
      return currentTime < threeHoursBefore;
   };

   if (!patientToken) {
      notFound();
   }

   if (!appointment) {
      return <div className="text-center mt-8">Loading appointment details...</div>;
   }
   return (
      <div className="container mx-auto px-4 py-8">
         <h1 className="text-3xl font-bold mb-6">Appointment Details</h1>
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
               <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                     <span>Appointment Information</span>
                     <GetStatusBadge status={appointment.status!} />
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                     <Calendar className="w-5 h-5" />
                     <span>{format(new Date(appointment.appointmentDate!), "PPPP")}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                     <Clock className="w-5 h-5" />
                     <span>{format(new Date(appointment.appointmentDate!), "p")}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                     {appointment.appointmentType === "video-consulting" ? (
                        <Video className="w-5 h-5" />
                     ) : (
                        <User className="w-5 h-5" />
                     )}
                     <span>{appointment.appointmentType}</span>
                  </div>
                  <div>
                     <h3 className="font-semibold mb-1 flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        Reason
                     </h3>
                     <p>{appointment.reason}</p>
                  </div>
                  <div>
                     <h3 className="font-semibold mb-1 flex items-center">
                        <FileText className="w-5 h-5 mr-2" />
                        Notes
                        <Button
                           variant="ghost"
                           size="sm"
                           className="ml-2"
                           onClick={() => {
                              setNewNote(appointment.notes || "");
                              setIsEditingNote(true);
                           }}
                        >
                           <Edit2 className="w-4 h-4" />
                        </Button>
                     </h3>
                     {isEditingNote ? (
                        <div className="flex items-center space-x-2">
                           <Input value={newNote} onChange={(e) => setNewNote(e.target.value)} className="flex-grow" />
                           <Button variant={"info"} onClick={handleUpdateNote}>
                              Save
                           </Button>
                           <Button variant="outline" onClick={() => setIsEditingNote(false)}>
                              Cancel
                           </Button>
                        </div>
                     ) : (
                        <p>{appointment.notes}</p>
                     )}
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle>Doctor Information</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                     <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        <Image
                           src={appointment.doctor?.image || "/placeholder.svg?height=64&width=64"}
                           alt={appointment.doctor?.name || "Doctor"}
                           layout="fill"
                           objectFit="cover"
                        />
                     </div>
                     <div>
                        <h3 className="font-semibold">{appointment.doctor?.name}</h3>
                        <p className="text-sm">{appointment.doctor?.qualifications?.join(", ")}</p>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <div className="flex items-center space-x-2">
                        <Image
                           src={"/assets/icons/email.svg"}
                           width={23}
                           height={23}
                           alt={appointment.doctor?.email!}
                           className="w-4 h-4"
                        />
                        <span>{appointment.doctor?.email}</span>
                     </div>
                     <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>{appointment.doctor?.phone}</span>
                     </div>
                  </div>
               </CardContent>
            </Card>

            <Card className="lg:col-span-3">
               <CardHeader>
                  <CardTitle>Slot Information</CardTitle>
               </CardHeader>
               <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                     <Clock className="w-5 h-5" />
                     <div>
                        <p className="font-semibold">Start Time</p>
                        <p>{appointment.slot?.startTime}</p>
                     </div>
                  </div>
                  <div className="flex items-center space-x-2">
                     <Clock className="w-5 h-5" />
                     <div>
                        <p className="font-semibold">End Time</p>
                        <p>{appointment.slot?.endTime}</p>
                     </div>
                  </div>
               </CardContent>
               <CardFooter className="justify-end">
                  {(appointment.status === AppointmentStatus.CONFIRMED ||
                     appointment.status === AppointmentStatus.PENDING) &&
                     isCancellable() && (
                        <Button variant="destructive" className="ml-2" onClick={() => setCancelModelOpen(true)}>
                           Cancel Appointment
                        </Button>
                     )}
               </CardFooter>
            </Card>
         </div>
         <ConfirmCancelAppointmentModelPatient
            open={isCancelModelOpen}
            setOpen={setCancelModelOpen}
            handleCancelAppointment={handleCancelAppointment}
         />
      </div>
   );
};

export default Page;
