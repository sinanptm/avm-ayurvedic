import React, { forwardRef, useState } from "react";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ButtonV2 } from "@/components/common/ButtonV2";
import NotificationModal from "@/components/models/NotificationModel";
import {
  useGetAllDoctorNotifications,
  useClearDoctorNotification,
  useClearMultipleDoctorNotifications,
} from "@/lib/hooks/notification/useNotificationDoctor";
import { INotification } from "@/types";

const NotificationButtonDoctor = forwardRef<HTMLButtonElement>((props, ref) => {
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const { data: notifications = [], refetch, error } = useGetAllDoctorNotifications();
  const { mutate: clearSingleNotification } = useClearDoctorNotification();
  const { mutate: clearMultipleNotification } = useClearMultipleDoctorNotifications();

  const notificationCount = notifications?.length || 0;
  const unauthorized = error?.status === 401 || error?.status === 403;

  const handleNotificationClick = () => {
    setIsNotificationModalOpen(true);
  };

  const handleClearSingleNotification = (notificationId: string) => {
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
          notifications={notifications as INotification[]}
          unauthorized={!!unauthorized}
          handleClearSingleNotification={handleClearSingleNotification}
          handleClearAllNotifications={handleClearAllNotifications}
        />
      )}
    </>
  );
});

NotificationButtonDoctor.displayName = "NotificationButtonDoctor";

export default NotificationButtonDoctor;
