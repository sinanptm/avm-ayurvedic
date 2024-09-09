"use client";
import Image from "next/image";
import SignupForm from "@/components/forms/patient/SignupForm";
import { Banners } from "@/constants";
import AuthSkelton from "@/components/skeletons/AuthPage";
import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import OAuth from './OAuth'

const SignUnFormSection = () => {
   const { patientToken } = useAuth();
   const [isLoading, setLoading] = useState(true);

   useEffect(() => {
      const timer = setTimeout(() => {
         setLoading(false);
      }, 0); 

      return () => clearTimeout(timer); 
   }, []);

   if (isLoading) {
      return <AuthSkelton />;
   }

   if (!patientToken) {
      return (
         <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container">
               <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
                  <Image
                     src="/assets/icons/logo-full.svg"
                     height={1000}
                     width={1000}
                     alt="patient"
                     className="mb-12 h-10 w-fit"
                  />
                  <SignupForm />
                  <OAuth />
                  <p className="copyright py-12">© {new Date().getFullYear()} AVM Ayurvedic.</p>
               </div>
            </section>

            <Image src={Banners.patient_signup} height={1000} width={1000} alt="patient" className="side-img max-w-[390px]" />
         </div>
      );
   }

   notFound();
};

export default SignUnFormSection;
