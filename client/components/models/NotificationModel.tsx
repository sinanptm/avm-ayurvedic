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

type Notification = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  notifications: Notification[];
};

export default function NotificationModal({ open, setOpen, notifications }: Props) {
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Notifications</h2>
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
          {notifications.map((notification) => (
            <Card key={notification.id}>
              <CardContent className="flex items-center space-x-4 p-4">
                <Image
                  src={notification.icon}
                  width={24}
                  height={24}
                  alt={notification.title}
                  className="h-6 w-6"
                />
                <div>
                  <h3 className="font-semibold">{notification.title}</h3>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <AlertDialogFooter>
          <Button onClick={closeModal}>Close</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}