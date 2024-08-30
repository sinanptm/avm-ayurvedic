"use client";
import { FormEvent } from "react";
import OtpVerificationModel from "@/components/models/OtpVerificationModel";
import { useAuth } from "@/hooks/useAuth";
import { notFound } from "next/navigation";

const OptInterceptor = () => {
   const handleVerify = (e: FormEvent) => {
      e.preventDefault();
   };
   const handleResend = () => {};
   const {patientToken} = useAuth();
   if(patientToken){
      notFound();
   }
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
