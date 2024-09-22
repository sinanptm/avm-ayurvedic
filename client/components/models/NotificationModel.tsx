'use client'

import { Dispatch, SetStateAction } from "react"
import Image from "next/image"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { INotification } from "@/types"
import getNotificationDetails from "@/lib/utils/getNotificationDetails"
import { useClearMultiplePatientNotifications, useClearPatientNotification } from "@/lib/hooks/notification/useNotificationPatient"
import { XIcon, Trash2Icon } from "lucide-react"
import { ButtonV2 } from "../common/ButtonV2"

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  notifications: INotification[]
  unauthorized: boolean,
  refetch: any
}

export default function NotificationModal({ open, setOpen, notifications, unauthorized, refetch }: Props) {
  const closeModal = () => {
    setOpen(false)
  }
  const { mutate: clearSingleNotification } = useClearPatientNotification()
  const { mutate: clearMultipleNotification } = useClearMultiplePatientNotifications()

  const handleClearSingleNotification = (notificationId: string) => {
    clearSingleNotification(
      { notificationId },
      {
        onSuccess: refetch,
        onError: (error) => {
          console.error("Failed to clear notification:", error)
        },
      },
    )
  }

  const handleClearAllNotifications = () => {
    const notificationIds = notifications.map(notification => notification._id!)
    clearMultipleNotification(
      { notificationIds },
      {
        onSuccess: refetch,
        onError: (error) => {
          console.error("Failed to clear multiple notifications:", error)
        },
      }
    )
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-3xl bg-dark-200">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between text-2xl font-semibold">
            Notifications
            <ButtonV2 variant="ghost" size="icon" onClick={closeModal}>
              <XIcon className="h-6 w-6" />
            </ButtonV2>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription></AlertDialogDescription>
        <div className="space-y-4">
          {unauthorized ? (
            <div className="flex flex-col items-center justify-center space-y-2 py-6">
              <Image
                src="/assets/icons/cancelled.svg"
                width={64}
                height={64}
                alt="Unauthorized"
                className="opacity-50"
              />
              <p className="text-center text-muted-foreground text-sm">
                You are not authorized to view these notifications.
              </p>
            </div>
          ) : notifications && notifications.length > 0 ? (
            <>
              {notifications.map((notification) => {
                const { icon, title } = getNotificationDetails(notification.type!)
                return (
                  <Card key={notification._id}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={icon}
                          width={24}
                          height={24}
                          alt={title}
                          className="h-6 w-6"
                        />
                        <div>
                          <h3 className="font-semibold">{title}</h3>
                          <p className="text-sm text-muted-foreground">{notification.message}</p>
                        </div>
                      </div>
                      <ButtonV2
                        variant="expandIcon"
                        size="icon"
                        onClick={() => handleClearSingleNotification(notification._id!)}
                        iconPlacement="left"
                        Icon={Trash2Icon}
                        className="text-muted-foreground hover:text-primary w-20"
                      >
                        Clear
                      </ButtonV2>

                    </CardContent>
                  </Card>
                )
              })}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2 py-6">
              <Image
                src="/assets/icons/emoji/😑.svg"
                width={64}
                height={64}
                alt="No Notifications"
                className="opacity-50"
              />
              <p className="text-center text-muted-foreground text-sm">
                You're all caught up! No new notifications.
              </p>
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <div className="flex justify-end space-x-2">
            {notifications.length > 0 && (
              <ButtonV2
                variant="outline"
                onClick={handleClearAllNotifications}
                className="text-muted-foreground hover:text-primary"
              >
                Clear All
              </ButtonV2>
            )}
            <ButtonV2 onClick={closeModal}>Close</ButtonV2>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}