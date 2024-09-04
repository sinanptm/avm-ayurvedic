import { ReactNode, FC } from "react";
import DoctorLayoutWithSideBar from "@/components/layout/DoctorLayoutWithSideBar";
import { Metadata } from "next";
import { DoctorsSidebarLinks } from "@/constants";


interface AdminLayoutWrapperProps {
   children: ReactNode;
}

export const metadata: Metadata = {
   title: "Dashboard",
};

const AdminLayoutWrapper: FC<AdminLayoutWrapperProps> = ({ children }) => {
   return (
      <DoctorLayoutWithSideBar sideBarLinks={DoctorsSidebarLinks}>
         <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">{children}</main>
      </DoctorLayoutWithSideBar>
   );
};

export default AdminLayoutWrapper;
