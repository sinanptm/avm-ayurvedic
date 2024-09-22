"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Tab = {
   title: string;
   value: string;
   content?: string | React.ReactNode | any;
};

export function Tabs({
   tabs: propTabs,
   containerClassName,
   activeTabClassName,
   tabClassName,
   contentClassName,
}: {
   tabs: Tab[];
   containerClassName?: string;
   activeTabClassName?: string;
   tabClassName?: string;
   contentClassName?: string;
}) {
   const [activeTab, setActiveTab] = useState<Tab>(propTabs[0]);

   return (
      <>
         <div
            className={cn(
               "flex flex-row items-center justify-start overflow-x-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
               containerClassName
            )}
         >
            {propTabs.map((tab) => (
               <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                     "relative px-2 py-1 sm:px-3 sm:py-2 md:px-4 md:py-2 rounded-full text-xs sm:text-sm md:text-base whitespace-nowrap",
                     tabClassName,
                     activeTab.value === tab.value && activeTabClassName
                  )}
               >
                  <span className="relative block text-black dark:text-white">{tab.title}</span>
               </button>
            ))}
         </div>
         <div className={cn("mt-8 sm:mt-16 md:mt-24 lg:mt-32", contentClassName)}>{activeTab.content}</div>
      </>
   );
}
