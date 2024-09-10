"use client";
import OtpForm from "@/components/forms/patient/OtpForms";
import { toast } from "@/components/ui/use-toast";
import { Banners } from "@/constants";
import { useResendOtpDoctor, useValidateOtpDoctor } from "@/lib/hooks/doctor/useDoctorAuth";
import { useAuth } from "@/lib/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const OtpVerificationPage = () => {
   const [otp, setOtp] = useState("");
   const { otpMailDoctor, setMultipleCredentials } = useAuth();
   const { mutate: validate, isPending } = useValidateOtpDoctor();
   const { mutate: resendOtp, isPending: isSending } = useResendOtpDoctor()
   const router = useRouter();

   const handleVerify = async (e: FormEvent) => {
      e.preventDefault();
      validate(
         { email: otpMailDoctor, otp: +otp },
         {
            onSuccess({ accessToken }) {
               toast({
                  title: "Authentication Success ✅",
                  description: "Your authentication process has been completed ",
                  variant: "success",
               });
               router.push("/doctor");
               setTimeout(() => {
                  setMultipleCredentials({ doctorToken: accessToken, otpMailDoctor: "" });
               }, 100);
            },
            onError(error) {
               toast({
                  title: "Authentication Failed ❌",
                  description: error.response?.data.message || "Unknown error occurred",
                  variant: "destructive",
               });
            },
         }
      );
   };


   const handleResend = async () => {
      resendOtp(
         { email: otpMailDoctor },
         {
            onSuccess: () => {
               toast({
                  title: "Otp Has sended 📩",
                  description: "Otp has Resented to you Email",
                  variant: "info",
               });
            },
            onError: (error) => {
               toast({
                  title: "Error in Sending Otp",
                  description: error.response?.data.message || "Unknown Error Occurred",
                  variant: "destructive",
               });
            }
         }
      );
   };

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
                        isLoading={isPending || isSending}
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
                  priority
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
