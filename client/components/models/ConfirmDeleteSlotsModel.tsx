import { Dispatch, SetStateAction } from "react";
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
  handleDeleteSlots: () => void;
}

export default function ConfirmDeleteSlotsModal({ open, setOpen, handleDeleteSlots }: Props) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="sm:max-w-[425px] w-[95vw] p-6 bg-dark-200">
        <VisuallyHidden hidden>
          <AlertDialogTitle>
            Delete
          </AlertDialogTitle>
          <AlertDialogDescription />
        </VisuallyHidden>
        <AlertDialogContent className="space-y-4 text-base">
          <AlertDialogHeader className="space-y-4">
            <AlertDialogTitle className="flex items-center gap-2 text-destructive text-xl font-semibold">
              <AlertTriangleIcon className="h-6 w-6" />
              Confirm Slot Deletion
            </AlertDialogTitle>
            <div>
              <p>
                You are about to delete selected time slot&apos;s. Please review the following implications:
              </p>
            </div>
            <div>
              <ul className="list-inside list-disc space-y-2">
                <li>The selected time slot&apos;s will be permanently removed from the schedule.</li>
                <li>All existing appointments within these slot&apos;s will be automatically canceled.</li>
                <li>Affected users will receive a cancellation notification.</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-destructive">This action cannot be undone. Are you certain you wish to proceed?</p>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-start mt-6 space-x-4">
            <AlertDialogCancel className="sm:w-1/2 w-full mb-2 sm:mb-0">
              Keep Slots
            </AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleDeleteSlots}
              className="sm:w-1/2 w-full"
            >
              Confirm Deletion
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogContent>
    </AlertDialog>
  );
}
