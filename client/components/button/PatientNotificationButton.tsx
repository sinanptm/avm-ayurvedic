"use client";

import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonV2 } from "@/components/common/ButtonV2";
import NotificationModal from "@/components/models/NotificationModel";
import { useState } from "react";
import { useGetAllPatientNotifications } from "@/lib/hooks/notification/useSlotPatient";
import { INotification } from "@/types";

const NotificationButton = () => {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const { data: notifications, isLoading } = useGetAllPatientNotifications();
  
  const notificationCount = notifications?.length || 0;

  const handleNotificationClick = () => {
    setIsNotificationModalOpen(true);
  };

  return (
    <>
      <ButtonV2 variant="ghost" size="icon" className="relative" onClick={handleNotificationClick}>
        <Bell className="h-5 w-5" />
        {notificationCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
          >
            {notificationCount}
          </Badge>
        )}
        <span className="sr-only">View notifications</span>
      </ButtonV2>
      <NotificationModal
        open={isNotificationModalOpen}
        setOpen={setIsNotificationModalOpen}
        notifications={notifications as INotification[] || []}
      />
    </>
  );
};

export default NotificationButton;