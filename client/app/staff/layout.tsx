import { ReactNode, FC } from "react";
import SideBar from "@/components/SideBar";
import { Metadata } from "next";

interface AdminLayoutWrapperProps {
   children: ReactNode;
   signin: ReactNode;
}

export const metadata: Metadata = {
   title: "Dashboard",
};

const AdminLayoutWrapper: FC<AdminLayoutWrapperProps> = ({
   signin,
   children,
}) => {
   const isLoggedIn = false;
   return isLoggedIn ? (
      <div className="flex min-h-screen bg-background">
         <SideBar />
         <div className="flex-1 overflow-auto">
            <main className="container mx-auto p-3 sm:p-5 lg:p-7">
               {children}
            </main>
         </div>
      </div>
   ) : (
      signin
   );
};

export default AdminLayoutWrapper;
