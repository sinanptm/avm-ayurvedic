"use client";
import NavSection from "@/components/patient/profile/NavSection";
import { memo, ReactNode, useState } from "react";
import ProfileSkeleton from "@/components/skeletons/ProfilePage";
import { notFound, useRouter } from "next/navigation";
import { useGetPatientProfile } from "@/lib/hooks/patient/usePatient";
import { toast } from "@/components/ui/use-toast";

interface Props {
   children: ReactNode;
   appointments: ReactNode;
   records: ReactNode;
}

const ProfilePageLayout = ({ children, appointments, records }: Props) => {
   const [section, setSection] = useState<"profile" | "appointments" | "records">("profile");
   const router = useRouter();

   const { data: patientData, isLoading, isError } = useGetPatientProfile();
   if (isLoading) {
      return <ProfileSkeleton />;
   }   

   if (isError) {
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
            <NavSection setSection={setSection} patientData={patientData!} />
            {section === "profile" && children}
            {section === "appointments" && appointments}
            {section === "records" && records}
         </div>
      </div>
   );
};

export default memo(ProfilePageLayout);
