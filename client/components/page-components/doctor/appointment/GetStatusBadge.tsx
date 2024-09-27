import { Badge } from "@/components/ui/badge";
import { AppointmentStatus } from "@/types/enum";

interface AppointmentStatusBadgeProps {
   status: AppointmentStatus;
}

export default function GetStatusBadge({ status }: AppointmentStatusBadgeProps) {
   const getStatusDetails = (status: AppointmentStatus) => {
      switch (status) {
         case AppointmentStatus.PENDING:
            return { variant: "warning" as const, label: "Pending" };
         case AppointmentStatus.CONFIRMED:
            return { variant: "default" as const, label: "Confirmed" };
         case AppointmentStatus.CANCELLED:
            return { variant: "destructive" as const, label: "Cancelled" };
         case AppointmentStatus.COMPLETED:
            return { variant: "success" as const, label: "Completed" };
         default:
            return { variant: "secondary" as const, label: "Unknown" };
      }
   };

   const { variant, label } = getStatusDetails(status);

   return (
      <Badge variant={variant} aria-label={`Appointment status: ${label}`}>
         {label}
      </Badge>
   );
}
