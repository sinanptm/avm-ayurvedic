import React from "react";
import SideBar from "@/components/SideBar";
import { Metadata } from "next";

interface AdminLayoutWrapperProps {
  children: React.ReactNode;
};

export const metadata:Metadata = {
  title:"Dashboard"
}

const AdminLayoutWrapper: React.FC<AdminLayoutWrapperProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-background">
      <SideBar />
      <div className="flex-1 overflow-auto">
        <main className="container mx-auto p-3 sm:p-5 lg:p-7">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayoutWrapper;
