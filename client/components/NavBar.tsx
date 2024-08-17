"use client";
import React from "react";
import { FloatingNav } from "./ui/floating-navbar";
import { NavItems } from "@/constants";
const NavBar = () => {
  return (
    <div className="relative  w-full">
      <FloatingNav navItems={NavItems} />
    </div>
  );
};

export default NavBar;
