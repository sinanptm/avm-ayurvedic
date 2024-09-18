"use client";
import NavSection from "@/components/patient/profile/NavSection";
import { memo, ReactNode, useState } from "react";
import ProfileSkeleton from "@/components/skeletons/ProfilePage";
import { notFound, useRouter } from "next/navigation";
import { useGetPatientProfile } from "@/lib/hooks/patient/usePatient";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/hooks/useAuth";

interface Props {
   children: ReactNode;
   appointments: ReactNode;
}

const ProfilePageLayout = ({ children, appointments }: Props) => {
   const [section, setSection] = useState<"profile" | "appointments">("profile");
   const router = useRouter();
   const { setCredentials } = useAuth();

   const { data: patientData, isLoading, isError, refetch, error } = useGetPatientProfile();
   if (isLoading) {
      return <ProfileSkeleton />;
   }

   if (isError) {
      if (error.response?.status === 403) {
         setTimeout(() => {
            toast({
               title: "You Have Been Blocked",
               description: "Your Blocked By Admin Please Contact Our Customer Care Service",
               variant: "destructive",
            });
            setCredentials("patientToken", "");
         });
      }
      notFound();
   }

   if (typeof patientData?.bloodGroup === "undefined") {
      router.push("/register");
      toast({
         title: "Personal Information Required 📝",
         description: "Please complete your personal information to proceed.",
         variant: "warning",
      });
      return;
   }

   return (
      <div className="min-h-screen p-4 sm:p-6 md:p-8">
         <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            <NavSection setSection={setSection} patientData={patientData!} refetch={refetch} />
            {section === "profile" && children}
            {section === "appointments" && appointments}
         </div>
      </div>
   );
};

export default memo(ProfilePageLayout);
