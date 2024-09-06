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
import { Button } from "../ui/button";

interface Props {
   open: boolean;
   setOpen: Dispatch<SetStateAction<boolean>>;
   handleLogoutConfirm: () => void;
}

const LogoutModel = ({ open, setOpen, handleLogoutConfirm }: Props) => {
   return (
      <AlertDialog open={open} onOpenChange={setOpen}>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
               <AlertDialogDescription>
                  You will be redirected to the home page after logging out.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
               <Button variant={"destructive"} onClick={handleLogoutConfirm}>
                  Log out
               </Button>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
};

export default LogoutModel;
