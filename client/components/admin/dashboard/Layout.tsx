"use client";
import AdminLayoutWithSideBar from "@/components/layout/AdminLayoutWithSideBar";
import UniversalSkelton from "@/components/skeletons/Universal";
import { AdminSideBarLinks } from "@/constants";
import { useAuth } from "@/lib/hooks/useAuth";
import { ReactNode, useEffect, useState } from "react";

type Props = {
   children: ReactNode;
   signin: ReactNode;
};

const Layout = ({ children, signin }: Props) => {
   const { adminToken } = useAuth();
   const [isLoading, setLoading] = useState(true);

   useEffect(() => {
      const timer = setTimeout(() => {
         setLoading(false);
      }, 0);
      return () => clearTimeout(timer);
   });

   if (isLoading) {
      return <UniversalSkelton />;
   }

   return (
      <>
         {adminToken ? (
            <AdminLayoutWithSideBar sideBarLinks={AdminSideBarLinks}>
               <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">{children}</main>
            </AdminLayoutWithSideBar>
         ) : (
            signin
         )}
      </>
   );
};

export default Layout;
