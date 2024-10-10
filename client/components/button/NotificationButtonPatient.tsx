"use client";

import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonV2 } from "@/components/button/ButtonV2";
import { memo, useCallback, useState } from "react";
import { INotification } from "@/types/entities";
import dynamic from "next/dynamic";
import useNotification from "@/lib/hooks/useNotification";
import { useAuth } from "@/lib/hooks/useAuth";

const NotificationModal = dynamic(() => import("@/components/models/NotificationModel"), { ssr: false });

const NotificationButtonPatient = () => {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const { patientToken } = useAuth();
  const { notifications, clearAllNotifications, clearNotification } = useNotification({ role: "patient" });

  const notificationCount = notifications.length;

  const handleNotificationClick = useCallback(() => {
    setIsNotificationModalOpen(true);
  },[]);

  const handleClearSingleNotification = useCallback((notificationId: string) => {
    clearNotification(notificationId);
  },[ clearAllNotifications]);

  const handleClearAllNotifications = useCallback(() => {
    if (!notifications || notifications.length === 0) return;
    const notificationsIds = notifications.map(el => el._id!);
    clearAllNotifications(notificationsIds);
  },[notifications, clearAllNotifications]);

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
        isUnauthorized={!!patientToken ? false : true}
        handleClearSingleNotification={handleClearSingleNotification}
        handleClearAllNotifications={handleClearAllNotifications}
        link="/appointments"
      />
    </>
  );
};

export default memo(NotificationButtonPatient);
