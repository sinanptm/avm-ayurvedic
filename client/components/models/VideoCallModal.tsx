'use client';

import { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { XIcon, Video } from "lucide-react";
import { ButtonV2 } from "../button/ButtonV2";
import Link from "next/link";

type Appointment = {
  _id: string;
  patientName: string;
  startTime: Date;
};

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  appointments: Appointment[];
  link: string;
};

export default function VideoCallModal({
  open,
  setOpen,
  appointments,
  link
}: Props) {
  const closeModal = () => {
    setOpen(false);
  };

  const formatTimeLeft = (startTime: Date) => {
    const now = new Date();
    const diff = startTime.getTime() - now.getTime();
    const minutes = Math.floor(diff / 60000);
    return `${minutes} minute${minutes !== 1 ? 's' : ''} left`;
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-3xl bg-dark-200">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between text-2xl font-semibold">
            Upcoming Video Calls
            <ButtonV2 variant="ghost" size="icon" onClick={closeModal} aria-label="Close">
              <XIcon className="h-6 w-6" />
            </ButtonV2>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription></AlertDialogDescription>
        <div className="space-y-4">
          {appointments.length > 0 ? (
            <>
              {appointments.map((appointment) => (
                <Link key={appointment._id} href={`${link}/${appointment._id}`} onClick={closeModal} >
                  <Card>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-4">
                        <Video className="h-6 w-6 text-primary" />
                        <div>
                          <h3 className="font-semibold">{appointment.patientName}</h3>
                          <p className="text-sm text-muted-foreground">{formatTimeLeft(appointment.startTime)}</p>
                        </div>
                      </div>
                      <ButtonV2
                        variant="expandIcon"
                        size="icon"
                        iconPlacement="left"
                        Icon={Video}
                        className="text-primary hover:text-primary-foreground w-20"
                        aria-label="Join call"
                      >
                        Join
                      </ButtonV2>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2 py-6">
              <Image
                src="/assets/icons/emoji/😴.svg"
                width={64}
                height={64}
                alt="No Upcoming Calls"
                className="opacity-50"
              />
              <p className="text-center text-muted-foreground text-sm">
                No upcoming video calls in the next hour.
              </p>
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <div className="flex justify-end space-x-2">
            <ButtonV2 variant={'gooeyRight'} onClick={closeModal}>Close</ButtonV2>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}