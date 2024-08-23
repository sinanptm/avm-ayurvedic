import React from "react";
import SideBar from "@/components/SideBar";

const AdminLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <SideBar />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default AdminLayoutWrapper;
