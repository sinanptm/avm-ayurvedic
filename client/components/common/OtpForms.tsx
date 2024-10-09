"use client";

import { FormEvent } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Otptimer } from "otp-timer-ts";
import SubmitButton from "@/components/button/SubmitButton";
import { PopoverContent, PopoverTrigger, Popover } from "@/components/ui/popover";
import { ButtonV2 } from "@/components/button/ButtonV2";
import Image from "next/image";


export interface Props {
   handleVerify: (e: FormEvent) => void;
   handleResend: () => void;
   timer: number;
   isLoading: boolean;
   otp: string;
   setOtp: (value: string) => void;
}

export default function OtpVerificationSection({
   handleVerify,
   handleResend,
   timer,
   isLoading,
   otp,
   setOtp,
}: Props) {
   return (
      <form className="space-y-6 flex-1" onSubmit={ (e: FormEvent) => handleVerify(e) }>
         <section className="mb-12 space-y-4">
            <h1 className="header">OTP Verification </h1>
            <p className="text-dark-700">Please enter the OTP sent to your registered Email Address.</p>
         </section>
         <InputOTP maxLength={ 6 } value={ otp } onChange={ (value) => setOtp(value) } className="mb-6">
            <InputOTPGroup className="shad-otp">
               <InputOTPSlot index={ 0 } className="shad-otp-slot" />
               <InputOTPSlot index={ 1 } className="shad-otp-slot" />
               <InputOTPSlot index={ 2 } className="shad-otp-slot" />
               <InputOTPSlot index={ 3 } className="shad-otp-slot" />
               <InputOTPSlot index={ 4 } className="shad-otp-slot" />
               <InputOTPSlot index={ 5 } className="shad-otp-slot" />
            </InputOTPGroup>
         </InputOTP>
         <div className="mt-4 mb-5 flex justify-between items-center">
            <Otptimer seconds={ timer } onResend={ handleResend } />
         </div>
         <div className="flex justify-between items-center space-x-1">
            <SubmitButton isLoading={ isLoading }>Verify OTP</SubmitButton>
            <Popover>
               <PopoverTrigger asChild>
                  <ButtonV2 type="button" variant="shine" size="icon">
                     <Image
                        src={ '/assets/icons/guarantees/confidential.svg' }
                        width={ 10 }
                        height={ 10 }
                        alt="Dummy user"
                     />
                  </ButtonV2>
               </PopoverTrigger>
               <PopoverContent className="w-80 bg-black">
                  <div className="space-y-2">
                     <h3 className="font-semibold">Tester Credentials:</h3>
                     <p className="text-sm">otp: { 777777 }</p>
                     <ButtonV2 type="button" variant="secondary" size="sm" onClick={ () => setOtp('777777') }>
                        Fill Credentials
                     </ButtonV2>
                  </div>
               </PopoverContent>
            </Popover>
         </div>
      </form>
   );
}
