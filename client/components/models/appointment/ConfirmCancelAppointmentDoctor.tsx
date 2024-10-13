import { Dispatch, memo, SetStateAction } from "react";
import {
   AlertDialog,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangleIcon } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface Props {
   open: boolean;
   setOpen: Dispatch<SetStateAction<boolean>>;
   handleCancelAppointment: () => void;
}

const AppointmentCancellationModal = ({ open, setOpen, handleCancelAppointment }: Props) => {
   return (
      <AlertDialog open={open} onOpenChange={setOpen}>
         <AlertDialogContent className="sm:max-w-[425px] w-[95vw] p-6 bg-black bg-opacity-65">
            <VisuallyHidden>
               <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
               <AlertDialogDescription />
            </VisuallyHidden>
            <AlertDialogContent className="space-y-4 text-base">
               <AlertDialogHeader className="space-y-4">
                  <AlertDialogTitle className="flex items-center gap-2 text-destructive text-xl font-semibold">
                     <AlertTriangleIcon className="h-6 w-6" />
                     Confirm Appointment Cancellation
                  </AlertDialogTitle>
                  <div>
                     <p>You are about to cancel this appointment. Please review the following implications:</p>
                  </div>
                  <div>
                     <ul className="list-inside list-disc space-y-2">
                        <li>The appointment will be removed from your schedule.</li>
                        <li>The patient will be notified of the cancellation.</li>
                        <li>The time slot may become available for other appointments.</li>
                     </ul>
                  </div>
                  <div>
                     <p className="font-semibold text-destructive">
                        This action cannot be undone. Are you certain you wish to proceed?
                     </p>
                  </div>
               </AlertDialogHeader>
               <AlertDialogFooter className="sm:justify-start mt-6 space-x-4">
                  <AlertDialogCancel className="sm:w-1/2 w-full mb-2 sm:mb-0">Keep Appointment</AlertDialogCancel>
                  <Button variant="destructive" onClick={handleCancelAppointment} className="sm:w-1/2 w-full">
                     Confirm Cancellation
                  </Button>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialogContent>
      </AlertDialog>
   );
};

export default memo(AppointmentCancellationModal);
