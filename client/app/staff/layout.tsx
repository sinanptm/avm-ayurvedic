import { ReactNode, FC } from "react";
import AdminSideBar from "@/components/AdminSideBar";
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
      <div className="flex h-screen">
          <AdminSideBar />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
   ) : (
      signin
   );
};

export default AdminLayoutWrapper;
