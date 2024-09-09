"use client";
import OtpForm from "@/components/forms/patient/OtpForms";
import { Banners } from "@/constants";
import { useAuth } from "@/lib/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FormEvent, useState } from "react";

const OtpVerificationPage = () => {
   const [otp, setOtp] = useState("");
   const [isLoading, setLoading] = useState(false);
   const { otpMailDoctor } = useAuth();
   const handleVerify = async (e: FormEvent) => {
      e.preventDefault();
      try {
      } catch (error) {
         console.log(error);
      }
   };

   const handleResend = async () => {};

   if (otpMailDoctor) {
      return (
         <div>
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
                     <OtpForm
                        handleResend={handleResend}
                        timer={30}
                        handleVerify={handleVerify}
                        isLoading={isLoading}
                        otp={otp}
                        setOtp={setOtp}
                     />
                     <div className="text-14-regular py-12 flex justify-between">
                        <p className="justify-items-end text-dark-600 xl:text-left">© 2024 AVM Ayurveda&apos;s</p>
                        <Link href={"/admin"} className="text-green-500">
                           Go Back
                        </Link>
                     </div>
                  </div>
               </section>

               <Image
                  src={Banners.doctor_otp}
                  height={1000}
                  width={1000}
                  alt="patient"
                  className="side-img max-w-[50%]"
               />
            </div>
         </div>
      );
   }

   notFound();
};

export default OtpVerificationPage;
