"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { XCircle } from "lucide-react";
import { ButtonV2 } from "@/components/common/ButtonV2";
import { useEffect, useState } from "react";
import { BreadcrumbCollapsed } from "@/components/navigation/BreadCrumbs";

export default function PaymentFailurePage() {
   const paymentId = useParams().id as string;
   const [transactionTime, setTransactionTime] = useState("");

   useEffect(() => {
      const formattedTime = new Date().toLocaleString();
      setTransactionTime(formattedTime);
   }, []);

   return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
         <BreadcrumbCollapsed items={[{ href: "/", label: "Home" }, { href: "/new-appointment", label: "New Appointment" },{ href: `/new-appointment/cancel${paymentId}`, label: "Cancel Appointment" }]} />
         <Link href="/" className="my-9">
            <Image
               src="/assets/icons/logo-full.svg"
               width={200}
               height={50}
               alt="AVM Ayurveda Logo"
               className="h-10 w-auto"
            />
         </Link>

         <div className="w-full max-w-md bg-card text-card-foreground rounded-lg shadow-lg p-6 space-y-6">
            <div className="text-center">
               <XCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
               <h2 className="text-xl font-semibold mb-2">Payment Failed</h2>
               <p className="text-muted-foreground mb-4">
                  We&apos;re sorry, but your payment could not be processed. Please try again or contact support if the issue
                  persists.
               </p>
            </div>

            <div className="space-y-4">
               <div className="flex items-center gap-3">
                  <Image src="/assets/icons/credit-card.svg" width={24} height={24} alt="Payment" />
                  <div>
                     <p className="font-medium">Payment ID</p>
                     <p className="text-sm text-muted-foreground">{paymentId}</p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <Image src="/assets/icons/calendar.svg" width={24} height={24} alt="Time" />
                  <div>
                     <p className="font-medium">Transaction Time</p>
                     <p className="text-sm text-muted-foreground">{transactionTime}</p>
                  </div>
               </div>
            </div>

            <div className="flex justify-center space-x-2">
               <ButtonV2 variant={"gooeyLeft"} asChild>
                  <Link href="/support">Contact Support</Link>
               </ButtonV2>
               <ButtonV2 variant={"shine"} asChild>
                  <Link href="/new-appointment">Try Again</Link>
               </ButtonV2>
            </div>
         </div>

         <p className="mt-8 text-sm text-muted-foreground">© 2024 AVM Ayurveda</p>
      </div>
   );
}
