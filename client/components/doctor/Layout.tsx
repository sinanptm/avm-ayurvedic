"use client";
import DoctorLayoutWithSideBar from "@/components/layout/DoctorLayoutWithSideBar";
import UniversalSkelton from "@/components/skeletons/Universal";
import { DoctorsSidebarLinks } from "@/constants";
import { useAuth } from "@/lib/hooks/useAuth";
import { ReactNode, useEffect, useState } from "react";

type Props = {
   children: ReactNode;
   auth: ReactNode;
};

const Layout = ({ children, auth }: Props) => {
   const { doctorToken } = useAuth();
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
         {doctorToken ? (
            <DoctorLayoutWithSideBar sideBarLinks={DoctorsSidebarLinks}>
               <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">{children}</main>
            </DoctorLayoutWithSideBar>
         ) : (
            auth
         )}
      </>
   );
};

export default Layout;
