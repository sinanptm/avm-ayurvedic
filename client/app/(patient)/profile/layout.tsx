'use client';
import NavSection from "@/components/patient/profile/NavSection";
import { memo, ReactNode, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPatientProfile } from "@/lib/services/api/patientProtectedApis";
import { ErrorResponse, IPatient } from "@/types";
import { AxiosError } from "axios";
import ProfileSkeleton from "@/components/skeletons/ProfilePage";
import { notFound } from "next/navigation";

interface Props {
  children: ReactNode;
  appointments: ReactNode;
  records: ReactNode;
}

const ProfilePageLayout = ({ children, appointments, records }: Props) => {
  const [section, setSection] = useState<"profile" | "appointments" | "records">('profile');

  const { data, isLoading, isError } = useQuery<IPatient, AxiosError<ErrorResponse>>({
    queryKey: ['patientProfile'],
    queryFn: getPatientProfile
  });

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (isError) {
    notFound(); 
  }


  console.log(data);
  

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        <NavSection setSection={setSection} />
        {section === 'profile' && children}
        {section === 'appointments' && appointments}
        {section === 'records' && records}
      </div>
    </div>
  );
};

export default memo(ProfilePageLayout);
