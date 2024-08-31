"use client";
import { FormEvent, useState } from "react";
import { useValidateOtpPatient } from "@/lib/hooks/usePatientAuth";
import { useToast } from "@/components/ui/use-toast";
import { notFound, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Banners } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import OtpVerificationSection from "@/components/forms/patient/OtpForms";
import UniversalSkelton from "@/components/skeletons/Universal";
import { useAuth } from "@/lib/hooks/useAuth";

const OtpVerificationPage = () => {
   const [otp, setOtp] = useState<string>("");
   const { mutate: validateOtp, isPending } = useValidateOtpPatient();
   const { toast } = useToast();
   const navigate = useRouter();
   const [isLoading,setLoading]= useState(true);
   const {setCredentials} = useAuth()


   const {patientToken} = useAuth()

   setTimeout(()=>{
      setLoading(false)
   });
   
   if (isLoading) {
      <UniversalSkelton />;
   }

   const handleVerify = async (e: FormEvent) => {
      e.preventDefault();
      validateOtp(
         { email: "muhammedsinan0549@gmail.com", otp: parseInt(otp) },
         {
            onSuccess: ({accessToken}) => {
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
               setCredentials("patientToken",accessToken)
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

   if (!patientToken) {
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

            <Image src={Banners.otp} height={1000} width={1000} alt="patient" className="side-img max-w-[50%]" />
         </div>
      );
   }
   notFound();
};

export default OtpVerificationPage;
