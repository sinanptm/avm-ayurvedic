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
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { INotification, NotificationTypes } from "@/types";
import getNotificationDetails from "@/lib/utils/getNotificationDetails";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  notifications: INotification[];
};

const NotificationModal = ({ open, setOpen, notifications }: Props) => {
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-3xl bg-dark-200">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between text-2xl font-semibold">
            Notifications
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
        <div className="space-y-4">
          {notifications.map((notification) => {
            const { icon, title } = getNotificationDetails(notification.type!);
            return (
              <Card key={notification._id}>
                <CardContent className="flex items-center space-x-4 p-4">
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
                </CardContent>
              </Card>
            );
          })}
        </div>
        <AlertDialogFooter>
          <Button onClick={closeModal}>Close</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default NotificationModal;