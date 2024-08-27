"use client";
import OtpVerificationSection from "@/components/forms/OtpForms";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
const OtpVerificationPage = () => {
   const [otp, setOtp] = useState("");
   const [isLoading, setLoading] = useState(false);

   const handleVerify = async (e: FormEvent) => {
      e.preventDefault();
      try {
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
