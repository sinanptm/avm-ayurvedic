'use client'

import { Dispatch, SetStateAction } from "react"
import Image from "next/image"
import Link from "next/link"
import { XIcon, Video } from "lucide-react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ButtonV2 } from "@/components/button/ButtonV2"
import { IVideoSection } from "@/types/entities"
import { format } from "date-fns"

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  sections: IVideoSection[]
  link: string
  user: "patient" | "doctor"
}

export default function VideoCallModal({
  open,
  setOpen,
  sections,
  link,
  user
}: Props) {
  const closeModal = () => {
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-3xl bg-dark-200">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between text-2xl font-semibold">
            Upcoming Online Appointments
            <ButtonV2 variant="ghost" size="icon" onClick={closeModal} aria-label="Close">
              <Image
                src={'/assets/icons/x.svg'}
                className="h-6 w-6"
                width={23}
                height={23}
                alt="Close"
              />
            </ButtonV2>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="sr-only">List of upcoming online appointments</AlertDialogDescription>

        {sections.length > 0 ? (
          <ScrollArea className="h-[50vh] pr-4">
            <div className="space-y-4">
              {sections.map((section) => (
                <Link key={section._id} href={`${link}/${section._id}`} onClick={closeModal} className="block">
                  <Card>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-4">
                        <Video className="h-6 w-6 text-primary" />
                        <div>
                          <h3 className="font-semibold">{user === 'patient' ? section.doctorName : section.patientName}</h3>
                          <p className="text-sm text-muted-foreground">{format(section.startTime!, "hh:mm a")}</p>
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
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 py-6">
            <Image
              src="/assets/icons/emoji/😑.svg"
              width={64}
              height={64}
              alt="No Upcoming Appointments"
              className="opacity-50"
            />
            <p className="text-center text-muted-foreground text-sm">
              No upcoming video appointments in the next hour.
            </p>
          </div>
        )}

        <AlertDialogFooter>
          <div className="flex justify-end space-x-2">
            <ButtonV2 variant="gooeyRight" onClick={closeModal}>Close</ButtonV2>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}