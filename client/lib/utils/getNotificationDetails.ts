import { NotificationTypes } from "@/types/enum";

export default function getNotificationDetails(type: NotificationTypes) {
   switch (type) {
      case NotificationTypes.APPOINTMENT_CANCELED:
         return {
            icon: "/assets/icons/utils/calendar-cancel.svg",
            title: "Appointment Canceled",
         };
      case NotificationTypes.APPOINTMENT_CONFIRMED:
         return {
            icon: "/assets/icons/utils/verified.svg",
            title: "Appointment Confirmed",
         };
      case NotificationTypes.APPOINTMENT_REMINDER:
         return {
            icon: "/assets/icons/utils/alarm-plus.svg",
            title: "Appointment Reminder",
         };
      default:
         return {
            icon: "/assets/icons/notification.svg",
            title: "Notification",
         };
   }
}
