"use client";
import SigninForm from "@/components/forms/patient/SigninForm";
import Image from "next/image";
import Link from "next/link";
import { Banners } from "@/constants";
import { notFound } from "next/navigation";
import AuthSkelton from "@/components/skeletons/AuthPage";
import { useAuth } from "@/lib/hooks/useAuth";
import { useState, useEffect } from "react";
import OAuth from "./OAuth";

const SignFromSection = () => {
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
        <section className="remove-scrollbar container my-auto">
          <div className="sub-container max-w-[496px]">
            <Image
              src={"/assets/icons/logo-full.svg"}
              width={1000}
              height={1000}
              alt="patient"
              className="mb-12 h-10 w-fit"
            />
            <SigninForm />
      
            <OAuth />

            <div className="text-14-regular py-12 flex justify-between">
              <p className="justify-items-end text-dark-600 xl:text-left">
                © {new Date().getFullYear()} AVM Ayurvedic.
              </p>
              <Link href={"/admin"} className="text-green-500 text-xs">
                Staff-Login
              </Link>
            </div>
          </div>
        </section>
        <Image src={Banners.patient_signin} height={1000} width={1000} alt="patient" className="side-img max-w-[50%]" />
      </div>
    );
  }

  notFound();
};

export default SignFromSection;
