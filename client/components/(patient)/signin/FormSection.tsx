import React from 'react'
import SigninForm from "@/components/forms/patient/SigninForm";
import Image from "next/image";
import Link from "next/link";
import { Banners } from "@/constants";

const FromSection = () => {

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
               <SigninForm />
               <div className="text-14-regular py-12 flex justify-between">
                  <p className="justify-items-end text-dark-600 xl:text-left">© 2024 AVM Ayurveda&apos;s</p>
                  <Link href={"/signup"} className="text-green-500 text-xs">
                     Staff-Login
                  </Link>
               </div>
            </div>
         </section>
         <Image src={Banners.signin} height={1000} width={1000} alt="patient" className="side-img max-w-[50%]" />
      </div>
   );
};

export default FromSection;
