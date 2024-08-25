"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
   InputOTP,
   InputOTPGroup,
   InputOTPSlot,
} from "@/components/ui/input-otp";
import { Otptimer } from "otp-timer-ts";
import { OptModelProps } from "@/types/fromTypes";

const OtpVerificationModel = ({ returnRoute,handleResend,handleVerify,timer }: OptModelProps) => {
   const router = useRouter();
   const [open, setOpen] = useState(true);
   const [otp, setOtp] = useState("");
   const [error, setError] = useState("");

   const closeModal = () => {
      setOpen(false);
      router.push(returnRoute);
   };


   return (
      <AlertDialog open={open} onOpenChange={setOpen} >
        <form onSubmit={(e)=>handleVerify(e)}>
        <AlertDialogContent className="shad-alert-dialog" >
            <AlertDialogHeader>
               <AlertDialogTitle className="flex items-start justify-between">
                  <p className="sub-header">OTP Verification</p>
                  <Image
                     src={`/assets/icons/close.svg`}
                     width={20}
                     height={20}
                     alt="close-icon"
                     onClick={() => closeModal()}
                     className="cursor-pointer"
                  />
               </AlertDialogTitle>
               <AlertDialogDescription>
                  Please enter the OTP sent to your registered mobile number.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <div>
               <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={value => setOtp(value)}
               >
                  <InputOTPGroup className="shad-otp">
                     <InputOTPSlot className="shad-otp-slot" index={0} />
                     <InputOTPSlot className="shad-otp-slot" index={1} />
                     <InputOTPSlot className="shad-otp-slot" index={2} />
                     <InputOTPSlot className="shad-otp-slot" index={3} />
                     <InputOTPSlot className="shad-otp-slot" index={4} />
                     <InputOTPSlot className="shad-otp-slot" index={5} />
                  </InputOTPGroup>
               </InputOTP>
               {error && (
                  <p className="shad-error text-14-regular mt-4 flex justify-center">
                     {error}
                  </p>
               )}
            </div>
            <div>
               <Otptimer seconds={timer} onResend={handleResend} />
            </div>
            <AlertDialogFooter>
               <AlertDialogAction type="submit" className="shad-primary-btn w-full">
                  Verify OTP
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
        </form>
      </AlertDialog>
   );
};

export default OtpVerificationModel;
