"use client";

import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonV2 } from "@/components/button/ButtonV2";
import { useState } from "react";
import { useGetAllPatientNotifications, useClearPatientNotification, useClearMultiplePatientNotifications } from "@/lib/hooks/notification/useNotificationPatient";
import { INotification } from "@/types/entities";
import dynamic from "next/dynamic";

const NotificationModal = dynamic(() => import("@/components/models/NotificationModel"), { ssr: false });

const NotificationButtonPatient = () => {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const { data, refetch, error } = useGetAllPatientNotifications();
  const { mutate: clearSingleNotification } = useClearPatientNotification();
  const { mutate: clearMultipleNotification } = useClearMultiplePatientNotifications();
  let notifications = data;

  const notificationCount = notifications?.length || 0;
  const unauthorized = error?.status === 401 || error?.status === 403;

  const handleNotificationClick = () => {
    setIsNotificationModalOpen(true);
  };

  const handleClearSingleNotification = (notificationId: string) => {
    notifications = notifications?.filter(el => el._id !== notificationId);
    clearSingleNotification(
      { notificationId },
      {
        onSuccess: () => refetch(),
        onError: (error) => {
          console.error("Failed to clear notification:", error);
        },
      }
    );
  };

  const handleClearAllNotifications = () => {
    if (!notifications || notifications.length === 0) return;
    const notificationIds = notifications.map((notification) => notification._id!);
    notifications = notifications?.filter(el => !notificationIds.includes(el._id!));
    clearMultipleNotification(
      { notificationIds },
      {
        onSuccess: () => refetch(),
        onError: (error) => {
          console.error("Failed to clear multiple notifications:", error);
        },
      }
    );
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
        unauthorized={unauthorized!}
        handleClearSingleNotification={handleClearSingleNotification}
        handleClearAllNotifications={handleClearAllNotifications}
        link="/appointments"
      />
    </>
  );
};

export default NotificationButtonPatient;
