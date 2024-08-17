"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Otptimer } from "otp-timer-ts";

const OtpVerificationModel = () => {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const closeModal = () => {
    setOpen(false);
    router.push(`/`);
  };

  const handleResend = () => {
    setOpen(false);
    setTimeout(()=>{
      setOpen(true);
    },1000)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            <h2 className="sub-header">OTP Verification</h2>
            <Image
              src={`/assets/icons/close.svg`}
              width={20}
              height={20}
              alt="close-icon"
              onClick={() => closeModal()}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            Please enter the OTP sent to your registered mobile number.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>
          {error && (
            <p className="shad-error text-14-regular mt-4 flex justify-center">
              {error}
            </p>
          )}
        </div>
        <div>
          <Otptimer minutes={0} seconds={30} onResend={handleResend} />
        </div>
        <AlertDialogFooter>
          <AlertDialogAction className="shad-primary-btn w-full">
            Verify OTP
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OtpVerificationModel;


// GET /patient/signin 200 in 354ms
//  ✓ Compiled in 730ms (1527 modules)

// <--- Last few GCs --->

// [8600:0000023A945E0B90]  2025911 ms: Mark-Compact (reduce) 391.6 (410.8) -> 390.8 (410.0) MB, 448.11 / 0.00 ms  (average mu = 0.899, current mu = 0.000) external memory pressure; GC in old space requested        
// [8600:0000023A945E0B90]  2026075 ms: Scavenge 391.8 (410.0) -> 391.3 (411.0) MB, 5.93 / 0.00 ms  (average mu = 0.899, current mu = 0.000) allocation failure;


// <--- JS stacktrace --->

// FATAL ERROR: NewSpace::EnsureCurrentCapacity Allocation failed - JavaScript heap out of memory
//  1: 00007FF7083A436F 
//  2: 00007FF70831C686
//  3: 00007FF70831E471
//  4: 00007FF708D8B281
//  5: 00007FF708D74A18
//  6: 00007FF708BD60A0
//  7: 00007FF708BAF580
//  8: 00007FF708BDCCEA
//  9: 00007FF708BDF7AC
// 10: 00007FF708BD2DC0
// 11: 00007FF708BD0913
// 12: 00007FF708AD2682
// 13: 00007FF708D38BC4
// 14: 00007FF708D38351
// 15: 00007FF708D37DD0
// 16: 00007FF708E3C74E
// 17: 00007FF708DAB4C3
// 18: 00007FF708EC3A16
// 19: 00007FF708E2D7CF
// 20: 00007FF708DAB4C3
// 21: 00007FF68A4F4B64
