"use client";
import PersonalInformation from "@/components/patient/profile/PersonalInformation";
import UpcomingAppointment from "@/components/patient/profile/UpcomingAppointment";
import AllergiesAndConditions from "@/components/patient/profile/AllergiesAndConditions";
import { useGetPatientProfile } from "@/lib/hooks/patient/usePatient";

export default function PatientProfilePage() {
   const { data: patientData, isLoading, refetch } = useGetPatientProfile();
   return (
      <>
         <PersonalInformation patientData={patientData!} isLoading={isLoading} refetch={refetch} />
         <UpcomingAppointment />
         <AllergiesAndConditions />
      </>
   );
}
