import { Dispatch, SetStateAction } from "react";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Props {
   isLogoutDialogOpen: boolean;
   setIsLogoutDialogOpen: Dispatch<SetStateAction<boolean>>;
   handleLogoutConfirm: () => void;
}

const LogoutModel = ({ isLogoutDialogOpen, setIsLogoutDialogOpen, handleLogoutConfirm }: Props) => {
   return (
      <AlertDialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
               <AlertDialogDescription>
                  You will be redirected to the home page after logging out.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
               <AlertDialogAction className="cursor-pointer" onClick={handleLogoutConfirm}>
                  Log out
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
};

export default LogoutModel;
