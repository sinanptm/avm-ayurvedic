"use client";
import OtpVerificationSection from "@/components/forms/patient/OtpForms";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { useValidateOtpPatient } from "@/hooks/usePatientAuth";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Banners } from "@/constants";

const OtpVerificationPage = () => {
   const [otp, setOtp] = useState<string>("");
   const { mutate: validateOtp, isPending } = useValidateOtpPatient();
   const { toast } = useToast();
   const navigate = useRouter();
   
   const handleVerify = async (e: FormEvent) => {
      e.preventDefault();
      validateOtp(
         { email: "muhammedsinan0549@gmail.com", otp: parseInt(otp) },
         {
            onSuccess: () => {
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
                  isLoading={isPending}
                  timer={30}
               />
            </div>
         </section>

         <Image
            src={Banners.otp}
            height={1000}
            width={1000}
            alt="patient"
            className="side-img max-w-[50%]"
         />
      </div>
   );
};

export default OtpVerificationPage;
