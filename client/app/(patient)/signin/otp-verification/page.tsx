"use client";
import { FormEvent, useEffect, useState } from "react";
import { useResendOtp, useValidateOtpPatient } from "@/lib/hooks/usePatientAuth";
import { useToast } from "@/components/ui/use-toast";
import { notFound, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Banners } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import OtpVerificationSection from "@/components/forms/patient/OtpForms";
import AuthSkelton from "@/components/skeletons/AuthPage";
import { useAuth } from "@/lib/hooks/useAuth";

const OtpVerificationPage = () => {
   const { setCredentials, otpMail } = useAuth();
   const [otp, setOtp] = useState<string>("");
   const { mutate: validateOtp, isPending } = useValidateOtpPatient();
   const [isSending,setSending] = useState(false);
   const {mutate: resendOtp} = useResendOtp()
   const { toast } = useToast();
   const navigate = useRouter();
   const [isLoading, setLoading] = useState(true);
   const { patientToken } = useAuth();
   
   useEffect(() => {
      const timer = setTimeout(() => {
         setLoading(false);
      }, 0); 

      return () => clearTimeout(timer);
   }, []);
   if (isLoading) {
      return  <AuthSkelton />;
   }
   if (otpMail && !patientToken) {
      const handleResend = async () => {
         setSending(true)
         resendOtp({email:otpMail},{
             onSuccess:()=>{
               setSending(false);
               toast({
                  title: "Otp Has sended 📩",
                  description: "Otp has been resented to you main",
                  variant: "info",
               });
             }
         });
      };

      const handleVerify = async (e: FormEvent) => {
         e.preventDefault();
         if(otp.length<6){
            return  toast({
               title: "Otp Required ✖️",
               description: "All Boxes Should be Filled",
               variant: "warning",
            });
         }
         validateOtp(
            { email: otpMail, otp: parseInt(otp) },
            {
               onSuccess: ({ accessToken }) => {
                  toast({
                     title: "Otp Verification Success ✅",
                     description: "Authentication Completed!. let's book your first appointment",
                     variant: "default",
                     action: (
                        <Button variant={"outline"}>
                           <Link href={"/new-appointment"}>Book Now</Link>
                        </Button>
                     ),
                  });
                  setTimeout(() => {
                     setCredentials("patientToken", accessToken);
                  }, 200);
                  navigate.push("/");
               },
               onError: (error) => {
                  toast({
                     title: "Otp Verification Failed ❌",
                     description: error.response?.data.message,
                     variant: "destructive",
                  });
               },
            }
         );
      };


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
                     isLoading={isSending}
                     timer={20}
                  />
               </div>
            </section>
            <Image src={Banners.otp} height={1000} width={1000} alt="patient" className="side-img max-w-[50%]" />
         </div>
      );
   }else{
      notFound();
   }
};

export default OtpVerificationPage;
