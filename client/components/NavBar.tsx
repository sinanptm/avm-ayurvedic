"use client";
import React from "react";
import { FloatingNav } from "./ui/floating-navbar";
import { NavItems } from "@/constants";
import { usePathname } from "next/navigation";
const NavBar = () => {
  const pathName = usePathname();

  if (
    !pathName.includes("/signin") &&
    !pathName.includes("/register") &&
    !pathName.includes("/new-appointment") &&
    !pathName.includes("/signup")
  ){
    return (
      <div className="relative  w-full">
        <FloatingNav navItems={NavItems} />
      </div>
    );
  }
    
};

export default NavBar;
