"use client";

import { Dispatch, SetStateAction, memo, useState } from "react";
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
import { IDoctor } from "@/types/entities";
import { useUpdateDoctorAdmin } from "@/lib/hooks/admin/useAdminDoctor";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import ConfirmVerifyDoctor from "./ConfirmVerifyDoctor";

type Props = {
   open: boolean;
   setOpen: Dispatch<SetStateAction<boolean>>;
   doctor: IDoctor;
   refetch: () => void;
};

const AdminDoctorProfileModal = ({ open, setOpen, doctor, refetch }: Props) => {
   const { mutate: handleUpdate, isPending } = useUpdateDoctorAdmin();
   const [isVerifyModelOpen, setVerifyModelOpen] = useState(false);
   const closeModal = () => {
      setOpen(false);
   };

   const handleBlock = () => {
      handleUpdate(
         { doctor: { _id: doctor._id, isBlocked: !doctor.isBlocked } },
         {
            onSuccess: () => {
               refetch();
               toast({
                  title: "Doctor Status Updated ✅",
                  variant: "success",
               });
               doctor.isBlocked = !doctor.isBlocked;
            },
            onError: (error: Error) => {
               toast({
                  title: "Error updating doctor status",
                  description: error.message || "Unknown Error Occurred",
                  variant: "destructive",
               });
            },
         }
      );
   };

   const handleVerify = () => {
      handleUpdate(
         { doctor: { _id: doctor._id, isVerified: true } },
         {
            onSuccess: () => {
               refetch();
               toast({
                  title: "Doctor Has Verified Updated ✅",
                  description: "Notification mail has sended to doctor",
                  variant: "success",
               });
               doctor.isVerified = true;
               setVerifyModelOpen(false);
            },
            onError: (error: Error) => {
               toast({
                  title: "Error Verifying Doctor",
                  description: error.message || "Unknown Error Occurred",
                  variant: "destructive",
               });
            },
         }
      );
   };

   if (!doctor) return null;

   return (
      <AlertDialog open={open} onOpenChange={setOpen}>
         <AlertDialogContent className="max-w-3xl">
            <AlertDialogHeader>
               <AlertDialogTitle className="flex items-center justify-between">
                  Doctor Profile
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
            <AlertDialogDescription>View and manage doctor details</AlertDialogDescription>
            <div className="space-y-6">
               <div className="flex items-center space-x-6">
                  <Image
                     src={doctor.image || "/placeholder.svg?height=128&width=128"}
                     alt={doctor.name || "Doctor Profile"}
                     width={128}
                     height={128}
                     className="rounded-full object-cover"
                  />
                  <div>
                     <h3 className="text-2xl font-semibold flex items-center justify-between">
                        {doctor.name}
                        {doctor.isVerified && (
                           <Image
                              src="/assets/icons/utils/verified.svg"
                              width={20}
                              height={20}
                              alt="Verification Status"
                              className="mr-2 h-5 w-5"
                           />
                        )}
                     </h3>
                     <p className="text-muted-foreground">{doctor.email}</p>
                     <Badge variant={doctor.isBlocked ? "destructive" : "success"}>
                        {doctor.isBlocked ? "Blocked" : "Active"}
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
                                 src="/assets/icons/phone.svg"
                                 width={20}
                                 height={20}
                                 alt="Phone"
                                 className="mr-2 h-5 w-5"
                              />
                              {doctor.phone || "Not provided"}
                           </li>
                           <li className="flex items-center">
                              <Image
                                 src="/assets/icons/email.svg"
                                 width={20}
                                 height={20}
                                 alt="Email"
                                 className="mr-2 h-5 w-5"
                              />
                              {doctor.email}
                           </li>
                        </ul>
                     </CardContent>
                  </Card>
                  <Card>
                     <CardContent className="pt-6">
                        <h4 className="mb-4 text-lg font-semibold">Professional Information</h4>
                        <ul className="space-y-2">
                           <li className="flex items-center">
                              <Image
                                 src="/assets/icons/utils/certificate.svg"
                                 width={20}
                                 height={20}
                                 alt="Qualifications"
                                 className="mr-2 h-5 w-5"
                              />
                              Qualifications: {doctor.qualifications?.join(", ") || "Not provided"}
                           </li>
                        </ul>
                     </CardContent>
                  </Card>
               </div>
            </div>
            <AlertDialogFooter className="flex justify-between ">
               <Button variant="outline" className="my-1" onClick={closeModal} disabled={isPending}>
                  {isPending ? (
                     <div className="flex items-center gap-4">
                        <Image src="/assets/icons/loader.svg" alt="loader" width={27} height={27} />
                     </div>
                  ) : (
                     <>Cancel</>
                  )}
               </Button>
               {!doctor.isVerified && (
                  <Button
                     variant={"info"}
                     className="my-1"
                     disabled={isPending}
                     onClick={() => setVerifyModelOpen(true)}
                  >
                     Verify Doctor
                  </Button>
               )}
               {doctor.isVerified && (
                  <Button
                     disabled={isPending}
                     className="my-1"
                     variant={doctor.isBlocked ? "success" : "destructive"}
                     onClick={handleBlock}
                  >
                     {isPending ? (
                        <div className="flex items-center gap-4">
                           <Image src="/assets/icons/loader.svg" alt="loader" width={27} height={27} />
                        </div>
                     ) : doctor.isBlocked ? (
                        "Unblock Doctor"
                     ) : (
                        "Block Doctor"
                     )}
                  </Button>
               )}
            </AlertDialogFooter>
         </AlertDialogContent>
         <ConfirmVerifyDoctor
            open={isVerifyModelOpen}
            setOpen={setVerifyModelOpen}
            handleConfirmVerify={handleVerify}
            isSubmitting={isPending}
         />
      </AlertDialog>
   );
};

export default memo(AdminDoctorProfileModal);
