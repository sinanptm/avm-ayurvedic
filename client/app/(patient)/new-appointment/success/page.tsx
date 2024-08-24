import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SuccessPage = () => {
   return (
      <div className="flex h-screen max-h-screen px-[5%]">
         <div className="success-img">
            <Link href="/">
               <Image
                  src={"/assets/icons/logo-full.svg"}
                  width={1000}
                  height={1000}
                  alt="Logo"
                  className="h-10 w-fit"
               />
            </Link>
            <section className="flex flex-col items-center">
               <Image
                  src={"/assets/gifs/success.gif"}
                  className="w-auto h-auto"
                  priority
                  width={300}
                  height={280}
                  alt="Success"
               />
               <h2 className="header mb-6 max-w-[600px] text-center">
                  Your{" "}
                  <span className="text-green-500">Appointment request</span>{" "}
                  has been successfully submitted!.
               </h2>
               <p>We will be in touch shortly to confirm.</p>
            </section>
            <section className="request-details">
               <p>Request Appointment details</p>
               <div className="flex  gap-3">
                  <Image
                     src={"/assets/icons/calendar.svg"}
                     width={24}
                     height={24}
                     alt="Calendar"
                  />
                  <p>
                     Date:{" "}
                     <span className="text-gray-300">
                        October 12, 2022, 3:00 PM{" "}
                     </span>
                  </p>
               </div>
            </section>
            <Button variant={"outline"} className="shad-primary-btn" asChild>
               <Link href={"/patient/new-appointment"}>New Appointment</Link>
            </Button>
            <p className="copyright">© 2024 AVM Ayurveda&apos;s</p>
         </div>
      </div>
   );
};

export default SuccessPage;
