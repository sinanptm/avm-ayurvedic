"use client";
import OtpVerificationSection from "@/components/forms/OtpForms";
import { useVerifyOtpMutation } from "@/lib/features/api/authApi";
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import {RootState} from '@/lib/store'

const OtpVerificationPage = () => {
   const [otp,setOtp] = useState('')
   const [verifyOtp, { isLoading , data}] = useVerifyOtpMutation();
   const email = useSelector((state:RootState)=>state.auth.token) as string

   const handleVerify = async (e: FormEvent) => {
      e.preventDefault();
      try {
         await verifyOtp({otp: parseInt(otp),email});
         console.log(data);
         
      } catch (error) {
         console.log(error);
         
      }
   };

   const handleResend = async () => {};

   return (
      <div className="flex h-screen max-h-screen">
         <section className="remove-scrollbar container my-auto">
            <div className="sub-container max-[496px]">
               <Image
                  src={"/assets/icons/logo-full.svg"}
                  width={1000}
                  height={1000}
                  alt="patient"
                  className="mb-12 h-10 w-fit"
               />
               <OtpVerificationSection
                  handleResend={handleResend}
                  otp={otp}
                  setOtp={setOtp}
                  handleVerify={handleVerify}
                  isLoading={isLoading}
                  timer={30}
               />
              
            </div>
         </section>

         <Image
            src="/assets/images/onboarding-img.png"
            height={1000}
            width={1000}
            alt="patient"
            className="side-img max-w-[50%]"
         />
      </div>
   );
};

export default OtpVerificationPage;
