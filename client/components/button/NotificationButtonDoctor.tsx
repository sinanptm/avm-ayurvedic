import React, { forwardRef, memo, useCallback, useState } from "react";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonV2 } from "@/components/button/ButtonV2";
import dynamic from "next/dynamic";
import useNotification from "@/lib/hooks/useNotification";

const NotificationModal = dynamic(() => import("@/components/models/NotificationModel"), { ssr: false });

const NotificationButtonDoctor = forwardRef<HTMLButtonElement>((props, ref) => {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const { notifications, clearAllNotifications, clearNotification } = useNotification({ role: "doctor" });

  const notificationCount = notifications.length;

  const handleNotificationClick = useCallback(() => {
    setIsNotificationModalOpen(true);
  }, []);

  const handleClearSingleNotification = useCallback((notificationId: string) => {
    clearNotification(notificationId);
  }, [ clearNotification]);

  const handleClearAllNotifications = useCallback(() => {
    if (!notifications || notifications.length === 0) return;

    const notificationIds = notifications.map((notification) => notification._id!);
    clearAllNotifications(notificationIds);
  }, [notifications,clearAllNotifications]);

  return (
    <>
      <ButtonV2
        ref={ref}
        variant="ghost"
        size="icon"
        className="relative"
        onClick={handleNotificationClick}
      >
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

      {isNotificationModalOpen && (
        <NotificationModal
          open={isNotificationModalOpen}
          setOpen={setIsNotificationModalOpen}
          notifications={notifications}
          isUnauthorized={false}
          handleClearSingleNotification={handleClearSingleNotification}
          handleClearAllNotifications={handleClearAllNotifications}
          link="/doctor/appointments"
        />
      )}
    </>
  );
});

NotificationButtonDoctor.displayName = "NotificationButtonDoctor";

export default memo(NotificationButtonDoctor);
