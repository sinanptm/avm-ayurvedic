import { ReactNode, FC } from "react";
import AdminLayoutWithSideBar from "@/components/layout/AdminLayoutWithSideBar";
import { Metadata } from "next";

interface AdminLayoutWrapperProps {
   children: ReactNode;
}

export const metadata: Metadata = {
   title: "Dashboard",
};

const AdminLayoutWrapper: FC<AdminLayoutWrapperProps> = ({ children }) => {
   return (
      <AdminLayoutWithSideBar>
         <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">{children}</main>
      </AdminLayoutWithSideBar>
   );
};

export default AdminLayoutWrapper;
