"use client";

import { memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ImagesSlider from "@/components/ui/images-slider";
import { SliderImages, SliderTexts } from "@/constants";
import { useAuth } from "@/lib/hooks/useAuth";
import { ButtonV2 } from "@/components/button/ButtonV2";
import FlipWords from "@/components/ui/flip-words";
import useRedirect from "@/lib/hooks/useRedirect";

const ImageSlider = () => {
   const { patientToken } = useAuth();
   const redirect = useRedirect();
   const [isClient, setIsClient] = useState(false);

   useEffect(() => {
      setIsClient(true);
   }, []);

   return (
      <ImagesSlider className="h-[40rem] z-10" images={SliderImages}>
         <motion.div
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="z-50 flex flex-col justify-center items-center"
         >
            <h1 className="font-bold text-lg md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
               <FlipWords words={SliderTexts} duration={5000} />
            </h1>
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 items-center justify-center">
               {isClient && (
                  <>
                     {!patientToken && (
                        <Link href="/signin" passHref>
                           <ButtonV2
                              variant="gooeyRight"
                              className="px-3 py-1.5 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white text-sm md:text-base rounded-full relative"
                              onClick={() => redirect("/signin")}
                           >
                              <span>Join now →</span>
                              <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
                           </ButtonV2>
                        </Link>
                     )}
                     <Link href="/new-appointment" passHref>
                        <ButtonV2
                           variant="gooeyRight"
                           className="px-3 py-1.5 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white text-sm md:text-base rounded-full relative"
                           onClick={() => redirect()}
                        >
                           <span>Book an Appointment now</span>
                           <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
                        </ButtonV2>
                     </Link>
                  </>
               )}
            </div>
         </motion.div>
      </ImagesSlider>
   );
};

export default memo(ImageSlider);
