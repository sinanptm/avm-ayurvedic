"use client";
import OtpForm from "@/components/common/OtpForms";
import { toast } from "@/components/ui/use-toast";
import { Banners } from "@/constants";
import { useResendOtpAdmin, useVerifyOtpAdmin } from "@/lib/hooks/admin/useAdminAuth";
import { useAuth } from "@/lib/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const OtpVerificationPage = () => {
   const [otp, setOtp] = useState<string>("");
   const { mutate: verify, isPending } = useVerifyOtpAdmin();
   const { mutate: resend } = useResendOtpAdmin();
   const { otpMailAdmin, setMultipleCredentials } = useAuth();
   const router = useRouter();
   const handleVerify = async (e: FormEvent) => {
      e.preventDefault();
      try {
         verify(
            { email: otpMailAdmin, otp: parseInt(otp) },
            {
               onSuccess: ({ accessToken }) => {
                  toast({
                     title: "Authentication Completed! ✅",
                     description: "Opt Verification has Completed",
                     variant: "success",
                  });
                  setMultipleCredentials({ adminToken: accessToken, otpMailAdmin: "" });
                  router.push("/admin/dashboard");
               },
               onError: (error) => {
                  toast({
                     title: "Authentication Failed! ❌",
                     description: error.response?.data.message || "Unknown Error Occurred ",
                     variant: "destructive",
                  });
               },
            }
         );
      } catch (error) {
         console.log(error);
      }
   };

   const handleResend = async () => {
      resend(
         { email: otpMailAdmin },
         {
            onSuccess: () => {
               toast({
                  title: "Otp Resented! ✅",
                  description: "Please Verify Before it Expires",
                  variant: "success",
               });
            },
            onError: (error) => {
               toast({
                  title: "Otp Resending Failed! ❌",
                  description: error.response?.data.message || "Unknown Error Occurred ",
                  variant: "destructive",
               });
            },
         }
      );
   };
   if (otpMailAdmin) {
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
                        isLoading={isPending}
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
                  src={Banners.admin_otp}
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
