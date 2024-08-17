"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { AdminSideBarLinks } from "@/constants";

const  SideBar= () =>{
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <Sidebar open={open} setOpen={setOpen} animate>
        <SidebarBody className="justify-between gap-10 h-full">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Logo />
            <div className="mt-8 flex flex-col gap-2">
              {AdminSideBarLinks.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <Image
                    src="/assets/images/admin.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      
    </div>
  );
}

export const Logo = () => {
  return (
    <Link href="#" className="flex items-center space-x-2 py-2">
      <Image
        src={'/assets/icons/logo-icon.svg'}
        alt="Logo"
        width={30} 
        height={30} 
      />
      <span className="font-medium text-black dark:text-white">AVM Ayurveda</span>
    </Link>
  );
};

export default SideBar