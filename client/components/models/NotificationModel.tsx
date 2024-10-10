'use client'

import { Dispatch, SetStateAction } from "react"
import Image from "next/image"
import Link from "next/link"
import { XIcon, Trash2Icon } from "lucide-react"
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
import { INotification } from "@/types/entities"
import getNotificationDetails from "@/lib/utils/getNotificationDetails"

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  notifications: INotification[]
  isUnauthorized: boolean
  handleClearSingleNotification: (notificationId: string) => void
  handleClearAllNotifications: () => void
  link: string
}

export default function NotificationModal({
  open,
  setOpen,
  notifications,
  isUnauthorized,
  handleClearSingleNotification,
  handleClearAllNotifications,
  link
}: Props) {
  const closeModal = () => {
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-[95vw] sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl bg-dark-200 p-4 sm:p-6">
        <AlertDialogHeader className="space-y-2 sm:space-y-4">
          <AlertDialogTitle className="flex items-center justify-between text-lg sm:text-xl font-semibold">
            Notifications
            <ButtonV2 variant="ghost" size="sm" onClick={closeModal} aria-label="Close">
              <XIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </ButtonV2>
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="sr-only">Your notifications</AlertDialogDescription>
        
        {isUnauthorized ? (
          <div className="flex flex-col items-center justify-center space-y-2 py-4 sm:py-6">
            <Image
              src="/assets/icons/cancelled.svg"
              width={48}
              height={48}
              alt="Unauthorized"
              className="opacity-50"
            />
            <p className="text-center text-muted-foreground text-xs sm:text-sm">
              You are not authorized to view these notifications.
            </p>
          </div>
        ) : notifications.length > 0 ? (
          <ScrollArea className="h-[40vh] sm:h-[50vh] pr-2 sm:pr-4">
            <div className="space-y-2 sm:space-y-4">
              {notifications.map((notification) => {
                const { icon, title } = getNotificationDetails(notification.type!)
                return (
                  <Link key={notification.appointmentId} href={`${link}/${notification.appointmentId}`} onClick={closeModal}>
                    <Card className="hover:bg-dark-100 transition-colors duration-200">
                      <CardContent className="flex items-center justify-between p-2 sm:p-4">
                        <div className="flex items-center space-x-2 sm:space-x-4">
                          <Image src={icon} width={20} height={20} alt={title} className="h-5 w-5 sm:h-6 sm:w-6" />
                          <div>
                            <h3 className="font-semibold text-sm sm:text-base">{title}</h3>
                            <p className="text-xs sm:text-sm text-muted-foreground">{notification.message}</p>
                          </div>
                        </div>
                        <ButtonV2
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            handleClearSingleNotification(notification._id!)
                          }}
                          iconPlacement="left"
                          Icon={Trash2Icon}
                          className="text-muted-foreground hover:text-primary"
                          aria-label="Clear notification"
                        >
                          <span className="sr-only sm:not-sr-only">Clear</span>
                        </ButtonV2>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 py-4 sm:py-6">
            <Image
              src="/assets/icons/emoji/😑.svg"
              width={48}
              height={48}
              alt="No Notifications"
              className="opacity-50"
            />
            <p className="text-center text-muted-foreground text-xs sm:text-sm">
              You&apos;re all caught up! No new notifications.
            </p>
          </div>
        )}
        
        <AlertDialogFooter>
          <div className="flex justify-end space-x-2">
            {notifications.length > 1 && (
              <ButtonV2
                variant="gooeyLeft"
                size="sm"
                onClick={handleClearAllNotifications}
                className="text-muted-foreground hover:text-primary text-xs sm:text-sm"
                aria-label="Clear all notifications"
              >
                Clear All
              </ButtonV2>
            )}
            <ButtonV2 variant="gooeyRight" size="sm" onClick={closeModal} className="text-xs sm:text-sm">Close</ButtonV2>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}