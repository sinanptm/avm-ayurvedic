"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useState } from "react";
import { useGetPatientProfile } from "@/lib/hooks/patient/usePatient";
import { ButtonV2 } from "@/components/button/ButtonV2";
import dynamic from "next/dynamic";
import Loading from "@/components/skeletons/Loader";

const UpdateProfilePatient = dynamic(() => import("@/components/models/patient/UpdateProfilePatient"), {
   loading: () => <Loading />,
});

export default function PatientProfilePage() {
   const { data: patientData, isLoading, refetch } = useGetPatientProfile();
   if (isLoading || !patientData) {
   }
   const infoItems = [
      {
         icon: "/assets/icons/calendar.svg",
         label: "Date of Birth",
         value: new Date(patientData?.dob!).toLocaleDateString(),
      },
      { icon: "/assets/icons/utils/male.svg", label: "Gender", value: patientData?.gender },
      { icon: "/assets/icons/utils/droplet.svg", label: "Blood Type", value: patientData?.bloodGroup },
      { icon: "/assets/icons/phone.svg", label: "Phone", value: patientData?.phone },
      { icon: "/assets/icons/email.svg", label: "Email", value: patientData?.email },
      { icon: "/assets/icons/home.svg", label: "Address", value: patientData?.address },
   ];

   const [isOpen, setIsOpen] = useState(false);

   return (
      <Card>
         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold text-primary">Personal Information</CardTitle>
            <ButtonV2
               variant="shine"
               size="sm"
               className="h-8 w-8 p-0"
               onClick={() => setIsOpen(!isOpen)}
               aria-label="Edit personal information"
            >
               <Image alt="Edit" src={"/assets/icons/edit.svg"} width={23} height={23} className="h-6 w-6" />
            </ButtonV2>
         </CardHeader>
         <CardContent className="grid gap-4 sm:grid-cols-2 pt-4">
            {infoItems.map((item, index) => (
               <div key={index} className="flex items-start space-x-4 rounded-lg border p-4">
                  <div className="rounded-full bg-primary/10 p-2 text-primary flex-shrink-0">
                     <Image src={item.icon} className="h-6 w-6" width={20} height={20} alt={item.label} />
                  </div>
                  <div className="flex-1 space-y-1 min-w-0">
                     <p className="text-sm font-medium leading-none text-muted-foreground">{item.label}</p>
                     {isLoading ? (
                        <Skeleton className="h-5 w-full" />
                     ) : (
                        <p className="text-sm font-semibold break-words" title={item.value}>
                           {item.label === "Email" ? <span className="truncate block">{item.value}</span> : item.value}
                        </p>
                     )}
                  </div>
               </div>
            ))}
            <UpdateProfilePatient open={isOpen} setOpen={setIsOpen} patientData={patientData!} refetch={refetch} />
         </CardContent>
      </Card>
   );
}
