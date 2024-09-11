"use client";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React, { createContext, useContext } from "react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Links {
   label: string;
   href: string;
   icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
   open: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
   const context = useContext(SidebarContext);
   if (!context) {
      throw new Error("useSidebar must be used within a SidebarProvider");
   }
   return context;
};

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
   return <SidebarContext.Provider value={{ open: false }}>{children}</SidebarContext.Provider>;
};

export const Sidebar = ({ children }: { children: React.ReactNode }) => {
   return <SidebarProvider>{children}</SidebarProvider>;
};

export const SidebarBody = ({ className, children, ...props }: React.ComponentProps<"div">) => {
   return (
      <div
         className={cn(
            "flex flex-col bg-neutral-100 dark:bg-neutral-800 flex-shrink-0 py-6",
            "w-[60px] h-screen",
            className
         )}
         {...props}
      >
         {children}
      </div>
   );
};

export const SidebarLink = ({ link, className, ...props }: { link: Links; className?: string; props?: LinkProps }) => {
   return (
      <TooltipProvider delayDuration={0} disableHoverableContent>
         <Tooltip>
            <TooltipTrigger asChild aria-label={link.label}>
               <Link href={link.href} className={cn("flex items-center justify-center py-2", className)} {...props}>
                  {link.icon}
               </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="border">
               <p>{link.label}</p>
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   );
};

export default Sidebar;
