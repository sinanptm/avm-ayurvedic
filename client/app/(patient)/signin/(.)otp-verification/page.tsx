"use client";
import { FormEvent } from "react";
import OtpVerificationModel from "@/components/models/OtpVerificationModel";

const OptInterceptor = () => {
   const handleVerify = (e: FormEvent) => {
      e.preventDefault();
   };
   const handleResend = () => {};

   return (
         <OtpVerificationModel
            returnRoute="/signin"
            key={12}
            timer={30}
            handleResend={handleResend}
            handleVerify={handleVerify}
         />
   );
};

export default OptInterceptor;
