'use client';

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
import { IDoctor } from "@/types";
import { useUpdateDoctorAdmin } from "@/lib/hooks/admin/useAdminDoctor";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  doctor: IDoctor;
  refetch: () => void;
};

const AdminDoctorProfileModal = ({ open, setOpen, doctor, refetch }: Props) => {
  const { mutate: handleUpdate, isPending } = useUpdateDoctorAdmin();

  const closeModal = () => {
    setOpen(false);
  };

  const handleChangeStatus = () => {
    handleUpdate(
      { doctor: { _id: doctor._id, isBlocked: !doctor.isBlocked } },
      {
        onSuccess: () => {
          refetch();
          toast({
            title: "Doctor Status Updated ✅",
            variant: "success",
          });
          doctor.isBlocked = !doctor.isBlocked
        },
        onError: (error: Error) => {
          toast({
            title: "Error updating doctor status",
            description: error.message,
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
        <AlertDialogDescription>
          View and manage doctor details
        </AlertDialogDescription>
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
              <h3 className="text-2xl font-semibold">{doctor.name}</h3>
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
                  <li className="flex items-center">
                    <Image
                      src="/assets/icons/utils/verified.svg"
                      width={20}
                      height={20}
                      alt="Verification Status"
                      className="mr-2 h-5 w-5"
                    />
                    Verification Status: {doctor.isVerified ? "Verified" : "Not Verified"}
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
            variant={doctor.isBlocked ? "success" : "destructive"}
            onClick={handleChangeStatus}
          >
            {isPending ? (
              <div className="flex items-center gap-4">
                <Image src="/assets/icons/loader.svg" alt="loader" width={27} height={27} />
              </div>
            ) : (
              doctor.isBlocked ? "Unblock Doctor" : "Block Doctor"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default memo(AdminDoctorProfileModal);