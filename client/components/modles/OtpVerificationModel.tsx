"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

 const OtpVerificationModel = () => {
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(true);
  const [passkey, setPassKey] = useState("");
  const [error, setError] = useState("");

  const closeModal = () => {
    setOpen(false);
    router.push(`/`);
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            <h2 className="sub-header">Access Verification</h2>
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
            To access the admin page, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => setPassKey(value)}
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
          {error && <p className="shad-error text-14-regular mt-4 flex justify-center">{error}</p>}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction className="shad-primary-btn w-full"
          >Verify Passkey</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default OtpVerificationModel;