"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { AnimatedCardProps } from "@/types";
import Link from "next/link";

const AnimatedCard = ({
   image = "/default.jpg",
   heading = "Default Heading",
   text = "Default text. Hover over this card to unleash the power of CSS perspective.",
   key,
   link = `/`,
   linkText = "Click me",
   className = "",
   imageClassName = "h-48 w-full object-cover rounded-xl group-hover/card:shadow-xl",
   children,
}: AnimatedCardProps) => {
   return (
      <CardContainer className={`inter-var ${className}`} key={key}>
         <CardBody className="bg-opacity-20 bg-green-200 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:border-white/[0.2] border-white/[0.1] md:w-[220px] h-full rounded-xl p-6 border min-w-[220px] w-[280px] ">
            <CardItem translateZ="50" className="text-xl font-bold">
               {heading}
            </CardItem>
            <CardItem as="p" translateZ="60" className="text-sm mt-2">
               {text}
            </CardItem>
            <CardItem
               translateZ="100"
               className={`w-full mt-4 ${imageClassName}`}
            >
               <Image
                  src={image}
                  priority
                  height="1000"
                  width="1000"
                  className={`group-hover/card:shadow-xl ${imageClassName}`}
                  alt="thumbnail"
               />
            </CardItem>
            <div className="flex justify-center mt-6">
               {children ? (
                  children
               ) : (
                  <CardItem
                     translateZ={20}
                     as="button"
                     className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 dark:bg-white dark:text-black text-white text-sm font-bold transition-colors"
                  >
                     <Link href={link}>{linkText}</Link>
                  </CardItem>
               )}
            </div>
         </CardBody>
      </CardContainer>
   );
};

export default AnimatedCard;