"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import { AlertCircle, Calendar, Clock, FileText, Pill } from "lucide-react";
import {
   useGetAppointmentDetailsPatient,
   useUpdateAppointmentStatusAndNotesPatient,
} from "@/lib/hooks/appointment/useAppointmentPatient";
import { useAuth } from "@/lib/hooks/useAuth";
import { AppointmentStatus } from "@/types/enum";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ConfirmCancelAppointmentModelPatient from "@/components/models/appointment/ConfirmCancelAppointmentPatient";
import { ButtonV2 } from "@/components/button/ButtonV2";
import dynamic from "next/dynamic";

const DownloadPrescriptionButton = dynamic(() => import("@/components/button/DownloadPrescriptionButton"), {
   ssr: false,
});

export default function AppointmentDetailsPage() {
   const id = useParams().id as string;
   const [isEditingNote, setIsEditingNote] = useState(false);
   const [isCancelModelOpen, setCancelModelOpen] = useState(false);
   const { data: appointment, refetch } = useGetAppointmentDetailsPatient(id);
   const { mutate: update } = useUpdateAppointmentStatusAndNotesPatient();
   const [newNote, setNewNote] = useState("");
   const { patientToken } = useAuth();

   const handleUpdateNote = async () => {
      if (newNote.trim()) {
         update(
            { appointmentId: id, status: appointment?.status!, notes: newNote },
            {
               onSuccess: () => {
                  toast({
                     title: "Note Updated",
                     description: "Your note has been successfully updated.",
                  });
                  setIsEditingNote(false);
                  refetch();
               },
               onError: () => {
                  toast({
                     title: "Error",
                     description: "Failed to update the note. Please try again.",
                     variant: "destructive",
                  });
               },
            }
         );
      } else {
         toast({
            title: "Invalid Input",
            description: "Note cannot be empty. Please enter some text.",
            variant: "destructive",
         });
      }
   };

   const handleCancelAppointment = async () => {
      update(
         { appointmentId: id, status: AppointmentStatus.CANCELLED, notes: appointment?.notes! },
         {
            onSuccess: () => {
               toast({
                  title: "Appointment Cancelled",
                  description:
                     "Your appointment has been successfully cancelled. Refund will be getting to your account in 10 working days 💸.",
               });
               refetch();
               setCancelModelOpen(false);
            },
            onError: () => {
               toast({
                  title: "Error",
                  description: "Failed to cancel the appointment. Please try again.",
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
      <div className="container mx-auto px-4 py-8 md:mb-56">
         <h1 className="text-3xl font-bold mb-6">Appointment Details</h1>
         <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
               <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                     <CardTitle>Appointment Information</CardTitle>
                     <Badge variant={appointment.status === AppointmentStatus.CONFIRMED ? "default" : "secondary"}>
                        {appointment.status}
                     </Badge>
                  </div>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                     <div className="flex items-center space-x-2">
                        <Image
                           src={"/assets/icons/calendar.svg"}
                           alt="Calendar"
                           width={24}
                           height={24}
                           className="text-muted-foreground"
                        />
                        <span className="text-sm">{format(new Date(appointment.appointmentDate!), "PPPP")}</span>
                     </div>
                     <div className="flex items-center space-x-2">
                        <Clock className="w-6 h-6 text-muted-foreground" />
                        <span className="text-sm">
                           {appointment.slot?.startTime} - {appointment.slot?.endTime}
                        </span>
                     </div>
                     <div className="flex items-center space-x-2">
                        {appointment.appointmentType === "video-consulting" ? (
                           <Image
                              src={"/assets/icons/utils/video.svg"}
                              alt="Video"
                              width={24}
                              height={24}
                              className="text-muted-foreground"
                           />
                        ) : (
                           <Image src={"/assets/icons/circle-user.svg"} alt="In-person" width={24} height={24} />
                        )}
                        <span className="text-sm capitalize">{appointment.appointmentType}</span>
                     </div>
                  </div>
                  <Separator />
                  <div>
                     <h3 className="font-semibold mb-2 flex items-center">
                        <Image
                           src={"/assets/icons/utils/file.svg"}
                           alt="File"
                           width={24}
                           height={24}
                           className="mr-2 text-muted-foreground"
                        />
                        Reason for Visit
                     </h3>
                     <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                  </div>
                  <Separator />
                  <div>
                     <h3 className="font-semibold mb-2 flex items-center justify-between">
                        <span className="flex items-center">
                           <Image
                              src={"/assets/icons/utils/file.svg"}
                              alt="Notes"
                              width={24}
                              height={24}
                              className="mr-2 text-muted-foreground"
                           />
                           Notes
                        </span>
                        <ButtonV2
                           variant="ghost"
                           size="sm"
                           onClick={() => {
                              setNewNote(appointment.notes || "");
                              setIsEditingNote(true);
                           }}
                        >
                           <Image src={"/assets/icons/edit.svg"} alt="Edit" width={20} height={20} className="mr-2" />
                           Edit
                        </ButtonV2>
                     </h3>
                     {isEditingNote ? (
                        <div className="space-y-2">
                           <Textarea
                              value={newNote}
                              onChange={(e) => setNewNote(e.target.value)}
                              className="w-full"
                              rows={3}
                           />
                           <div className="flex justify-end space-x-2">
                              <ButtonV2 variant="secondary" onClick={() => setIsEditingNote(false)}>
                                 Cancel
                              </ButtonV2>
                              <ButtonV2 variant={"ringHover"} onClick={handleUpdateNote}>
                                 Save
                              </ButtonV2>
                           </div>
                        </div>
                     ) : (
                        <p className="text-sm text-muted-foreground">{appointment.notes || "No notes added yet."}</p>
                     )}
                  </div>
               </CardContent>
               <CardFooter className="justify-end">
                  {(appointment.status === AppointmentStatus.CONFIRMED ||
                     appointment.status === AppointmentStatus.PENDING) &&
                     isCancellable() && (
                        <ButtonV2 variant="destructive" onClick={() => setCancelModelOpen(true)}>
                           Cancel Appointment
                        </ButtonV2>
                     )}
               </CardFooter>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle>Doctor Information</CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                     <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        <Image
                           src={appointment.doctor?.image || "/placeholder.svg?height=64&width=64"}
                           alt={appointment.doctor?.name || "Doctor"}
                           layout="fill"
                           objectFit="cover"
                        />
                     </div>
                     <div className="text-center sm:text-left">
                        <h3 className="font-semibold">{appointment.doctor?.name}</h3>
                        <p className="text-sm text-muted-foreground">
                           {appointment.doctor?.qualifications?.join(", ")}
                        </p>
                     </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                     <div className="flex items-center space-x-2">
                        <Image
                           src="/assets/icons/email.svg"
                           width={20}
                           height={20}
                           alt="Email"
                           className="text-muted-foreground"
                        />
                        <span className="text-sm">{appointment.doctor?.email}</span>
                     </div>
                     <div className="flex items-center space-x-2">
                        <Image
                           src="/assets/icons/phone.svg"
                           width={20}
                           height={20}
                           alt="Phone"
                           className="text-muted-foreground"
                        />
                        <span className="text-sm">{appointment.doctor?.phone}</span>
                     </div>
                  </div>
               </CardContent>
            </Card>

            {appointment.prescription && (
               <Card className="md:col-span-3">
                  <CardHeader className="space-y-6">
                     <CardTitle className="flex items-center">
                        <Pill className="w-5 h-5 mr-2 text-primary" />
                        Prescription
                     </CardTitle>
                     <DownloadPrescriptionButton
                        prescription={appointment.prescription}
                        patient={appointment.patient!}
                        doctor={appointment.doctor!}
                     />
                  </CardHeader>
                  <CardContent className="p-6">
                     <div className="space-y-6">
                        <div>
                           <h3 className="text-lg font-semibold mb-4 flex items-center">
                              <Pill className="w-5 h-5 mr-2 text-primary" />
                              Medications
                           </h3>
                           <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                              {appointment.prescription?.medications!.map((med, index) => (
                                 <div key={index} className="bg-muted p-4 rounded-lg">
                                    <h4 className="text-md font-medium mb-2">{med.name}</h4>
                                    <div className="space-y-2 text-sm">
                                       <div className="flex items-center">
                                          <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                                          <span className="text-muted-foreground">Dosage: {med.dosage}</span>
                                       </div>
                                       <div className="flex items-center">
                                          <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                                          <span className="text-muted-foreground">Frequency: {med.frequency}</span>
                                       </div>
                                       <div className="flex items-center">
                                          <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                                          <span className="text-muted-foreground">Duration: {med.duration}</span>
                                       </div>
                                       {med.additionalInstructions && med.additionalInstructions.length > 0 && (
                                          <div className="flex items-start">
                                             <AlertCircle className="w-4 h-4 mr-2 text-muted-foreground shrink-0 mt-1" />
                                             <p className="text-sm text-muted-foreground">
                                                Additional Instructions: {med.additionalInstructions}
                                             </p>
                                          </div>
                                       )}
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>

                        {appointment.prescription.notes && (
                           <>
                              <Separator />
                              <div>
                                 <h3 className="text-lg font-semibold mb-4 flex items-center">
                                    <FileText className="w-5 h-5 mr-2 text-primary" />
                                    Notes
                                 </h3>
                                 <div className="bg-muted p-4 rounded-lg">
                                    <p className="text-sm text-muted-foreground">{appointment.prescription.notes}</p>
                                 </div>
                              </div>
                           </>
                        )}
                     </div>
                  </CardContent>
               </Card>
            )}
         </div>
         <ConfirmCancelAppointmentModelPatient
            open={isCancelModelOpen}
            setOpen={setCancelModelOpen}
            handleCancelAppointment={handleCancelAppointment}
         />
      </div>
   );
}
