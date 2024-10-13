"use client";
import { useAuth } from "@/lib/hooks/useAuth";
import { ReactNode, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import VideoCallSkeleton from "@/components/skeletons/VideoSection";

const PatientVideoLayout = ({ children }: { children: ReactNode }) => {
   const [isLoading, setLoading] = useState(true);
   const { patientToken } = useAuth();
   const isPatient = !!patientToken;

   useEffect(() => {
      if (isPatient) {
         const timer = setTimeout(() => {
            setLoading(false);
         }, 0);
         return () => clearTimeout(timer);
      } else {
         setLoading(false);
      }
   }, [isPatient]);

   if (isLoading) {
      return <VideoCallSkeleton />;
   }

   if (!isPatient) {
      notFound();
   }
   return <div className="w-full h-full pt-7">{children}</div>;
};

export default PatientVideoLayout;
