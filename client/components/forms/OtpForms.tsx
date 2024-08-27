"use client";

import { FormEvent } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Otptimer } from "otp-timer-ts";
import { OtpFromProps } from "@/types/fromTypes";
import SubmitButton from "../common/SubmitButton";

export default function OtpVerificationSection({
   handleVerify,
   handleResend,
   timer,
   isLoading,
   otp,
   setOtp,
}: OtpFromProps) {
   return (
      <form className="space-y-6 flex-1" onSubmit={(e: FormEvent) => handleVerify(e)}>
         <section className="mb-12 space-y-4">
            <h1 className="header">OTP Verification </h1>
            <p className="text-dark-700">Please enter the OTP sent to your registered mobile number.</p>
         </section>
         <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)} className="mb-6">
            <InputOTPGroup className="shad-otp">
               <InputOTPSlot index={0} className="shad-otp-slot" />
               <InputOTPSlot index={1} className="shad-otp-slot" />
               <InputOTPSlot index={2} className="shad-otp-slot" />
               <InputOTPSlot index={3} className="shad-otp-slot" />
               <InputOTPSlot index={4} className="shad-otp-slot" />
               <InputOTPSlot index={5} className="shad-otp-slot" />
            </InputOTPGroup>
         </InputOTP>
         <div className="mt-4 mb-5 flex justify-between items-center">
            <Otptimer seconds={timer} onResend={handleResend} />
         </div>
         <SubmitButton isLoading={isLoading}>Verify OTP</SubmitButton>
      </form>
   );
}
