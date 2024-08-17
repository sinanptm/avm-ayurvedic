'use client'
import React from "react";
import SideBar from "@/components/SideBar";
import { usePathname } from "next/navigation";

const AdminLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <div className="flex">
      {!pathname.includes("/signin") && <SideBar />}
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default AdminLayoutWrapper;
