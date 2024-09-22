"use client";

import { Dispatch, SetStateAction, memo } from "react";
import Image from "next/image";
import {
   AlertDialog,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IPatient } from "@/types";
import { useChangeStatusAdmin } from "@/lib/hooks/admin/useAdminPatients";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

type Props = {
   open: boolean;
   setOpen: Dispatch<SetStateAction<boolean>>;
   patient: IPatient;
   refetch: any;
};

const AdminPatientProfileModel = ({ open, setOpen, patient, refetch }: Props) => {
   const { mutate: handleBlock, isPending } = useChangeStatusAdmin();
   const closeModal = () => {
      setOpen(false);
   };

   const handleChangeStatus = () => {
      handleBlock(
         { id: patient._id!, isBlocked: patient.isBlocked! },
         {
            onSuccess: () => {
               refetch();
               toast({
                  title: "Patient Status Updated ✅",
                  variant: "success",
               });
               patient.isBlocked = !patient.isBlocked;
            },
            onError: (error) => {
               console.log(error.response?.data || error.message);
            },
         }
      );
   };

   if (!patient) return null;

   return (
      <AlertDialog open={open} onOpenChange={setOpen}>
         <AlertDialogContent className="max-w-3xl">
            <AlertDialogHeader>
               <AlertDialogTitle className="flex items-center justify-between">
                  <Button variant="ghost" size="icon" onClick={closeModal}>
                     <Image
                        src="/assets/icons/close.svg"
                        width={24}
                        height={24}
                        alt="Close"
                        className="cursor-pointer"
                     />
                  </Button>
               </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription></AlertDialogDescription>
            <div className="space-y-6">
               <div className="flex items-center space-x-6">
                  <Image
                     src={patient.profile || "/assets/icons/user.svg?height=128&width=128"}
                     alt={patient.name || "Profile"}
                     width={128}
                     height={128}
                     className="rounded-full object-cover"
                  />
                  <div>
                     <h3 className="text-2xl font-semibold">{patient.name}</h3>
                     <p className="text-muted-foreground">{patient.gender || "Not specified"}</p>
                     <Badge variant={`${patient.isBlocked ? "destructive" : "success"}`}>
                        {patient.isBlocked ? "Blocked" : "Not Blocked"}
                     </Badge>
                  </div>
               </div>
               <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Card>
                     <CardContent className="pt-6">
                        <h4 className="mb-4 text-lg font-semibold">Contact Information</h4>
                        <ul className="space-y-2">
                           <li className="flex items-center">
                              <Image
                                 src="/assets/icons/email.svg"
                                 width={20}
                                 height={20}
                                 alt="Email"
                                 className="mr-2 h-5 w-5"
                              />
                              {patient.email}
                           </li>
                           <li className="flex items-center">
                              <Image
                                 src="/assets/icons/phone.svg"
                                 width={20}
                                 height={20}
                                 alt="Phone"
                                 className="mr-2 h-5 w-5"
                              />
                              {patient.phone || "Not provided"}
                           </li>
                           <li className="flex items-center">
                              <Image
                                 src="/assets/icons/map.svg"
                                 width={20}
                                 height={20}
                                 alt="Address"
                                 className="mr-2 h-5 w-5"
                              />
                              {patient.address || "Not provided"}
                           </li>
                        </ul>
                     </CardContent>
                  </Card>
                  <Card>
                     <CardContent className="pt-6">
                        <h4 className="mb-4 text-lg font-semibold">Personal Information</h4>
                        <ul className="space-y-2">
                           <li className="flex items-center">
                              <Image
                                 src="/assets/icons/calendar.svg"
                                 width={20}
                                 height={20}
                                 alt="DOB"
                                 className="mr-2 h-5 w-5"
                              />
                              DOB: {patient.dob ? new Date(patient.dob).toLocaleDateString() : "Not provided"}
                           </li>
                           <li className="flex items-center">
                              <Image
                                 src="/assets/icons/utils/droplet.svg"
                                 width={20}
                                 height={20}
                                 alt="Blood Group"
                                 className="mr-2 h-5 w-5"
                              />
                              Blood Group: {patient.bloodGroup || "Not provided"}
                           </li>
                           <li className="flex items-center">
                              <Image
                                 src="/assets/icons/user.svg"
                                 width={20}
                                 height={20}
                                 alt="Occupation"
                                 className="mr-2 h-5 w-5"
                              />
                              Occupation: {patient.occupation || "Not provided"}
                           </li>
                        </ul>
                     </CardContent>
                  </Card>
               </div>
            </div>
            <AlertDialogFooter className="flex justify-between">
               <Button variant="outline" onClick={closeModal} disabled={isPending}>
                  Close
               </Button>
               <Button
                  disabled={isPending}
                  variant={`${patient.isBlocked ? "destructive" : "success"}`}
                  onClick={handleChangeStatus}
               >
                  {isPending ? (
                     <div className="flex items-center gap-4">
                        <Image src="/assets/icons/loader.svg" alt="loader" width={27} height={27} />
                     </div>
                  ) : patient.isBlocked ? (
                     <>Unblock Patient</>
                  ) : (
                     <>Block Patient</>
                  )}
               </Button>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
};

export default memo(AdminPatientProfileModel);
