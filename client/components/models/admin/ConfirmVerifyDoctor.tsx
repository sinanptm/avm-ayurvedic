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
import Image from "next/image";

interface Props {
   open: boolean;
   setOpen: Dispatch<SetStateAction<boolean>>;
   handleConfirmVerify: () => void;
   isSubmitting: boolean;
}

const ConfirmVerifyDoctor = ({ open, setOpen, handleConfirmVerify, isSubmitting }: Props) => {
   return (
      <AlertDialog open={open} onOpenChange={setOpen}>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Confirm Verification</AlertDialogTitle>
               <AlertDialogDescription>
                  Are you sure you want to verify this doctor? Once verified, this action cannot be undone.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel className="cursor-pointer" disabled={isSubmitting}>
                  {isSubmitting ? (
                     <div className="flex items-center gap-4">
                        <Image src="/assets/icons/loader.svg" alt="loader" width={27} height={27} />
                     </div>
                  ) : (
                     <>Cancel</>
                  )}
               </AlertDialogCancel>
               <Button variant="success" disabled={isSubmitting} onClick={handleConfirmVerify}>
                  {isSubmitting ? (
                     <div className="flex items-center gap-4">
                        <Image src="/assets/icons/loader.svg" alt="loader" width={27} height={27} />
                     </div>
                  ) : (
                     <>Confirm Verification</>
                  )}
               </Button>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
};

export default ConfirmVerifyDoctor;
