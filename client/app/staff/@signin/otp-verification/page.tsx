'use client'
import OtpForm from "@/components/forms/OtpForms";
import Image from "next/image";
import Link from "next/link";
import { FormEvent } from "react";

const OtpVerificationPage = () => {
   const handleVerify =(e:FormEvent)=>{
      e.preventDefault();
      console.log('');
      
   }
   const handleResend = ()=>{
      console.log('');  
   }
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
               <OtpForm handleResend={handleResend} timer={30} handleVerify={handleVerify} />
               <div className="text-14-regular py-12 flex justify-between">
                  <p className="justify-items-end text-dark-600 xl:text-left">
                     © 2024 AVM Ayurveda&apos;s
                  </p>
                  <Link href={"/staff"} className="text-green-500">
                     Go Back
                  </Link>
               </div>
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
    </div>
  )
}


export default OtpVerificationPage