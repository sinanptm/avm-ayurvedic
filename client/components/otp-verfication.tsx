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

const OtpVerificationModel = () => {
   const router = useRouter();
   const [open, setOpen] = useState(true);
   const [otp, setOtp] = useState("");
   const [error, setError] = useState("");

   const closeModal = () => {
      setOpen(false);
      router.push(`/`);
   };

   const handleResend = () => {
      setOpen(false);
      setTimeout(() => {
         setOpen(true);
      }, 1000);
   };

   return (
      <AlertDialog open={open} onOpenChange={setOpen}>
         <AlertDialogContent className="shad-alert-dialog">
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
               <Otptimer minutes={0} seconds={30} onResend={handleResend} />
            </div>
            <AlertDialogFooter>
               <AlertDialogAction className="shad-primary-btn w-full">
                  Verify OTP
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
};

export default OtpVerificationModel;
