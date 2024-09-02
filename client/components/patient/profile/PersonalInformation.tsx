import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { IPatient } from "@/types";
import Image from "next/image";
import { useState } from "react";
import UpdateProfilePatient from "@/components/models/UpdateProfilePatient";

type Props = {
   patientData: IPatient;
   isLoading: boolean;
   refetch:any;
};


export default function PersonalInformation({ patientData, isLoading,refetch }: Props) {
   const infoItems = [
      {
         icon: "/assets/icons/calendar.svg",
         label: "Date of Birth",
         value: new Date(patientData.dob!).toLocaleDateString(),
      },
      { icon: "/assets/icons/utils/male.svg", label: "Gender", value: patientData.gender },
      { icon: "/assets/icons/utils/droplet.svg", label: "Blood Type", value: patientData.bloodGroup },
      { icon: "/assets/icons/phone.svg", label: "Phone", value: patientData.phone },
      { icon: "/assets/icons/email.svg", label: "Email", value: patientData.email },
      { icon: "/assets/icons/home.svg", label: "Address", value: patientData.address },
   ];

   const [isOpen, setIsOpen] = useState(false);

   return (
      <Card>
         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold text-primary">Personal Information</CardTitle>
            <Button
               variant="outline"
               size="sm"
               className="h-8 w-8 p-0"
               onClick={() => setIsOpen(!isOpen)}
               aria-label="Edit personal information">
               <Image alt="Edit" src={"/assets/icons/edit.svg"} width={23} height={23} className="h-6 w-6" />
            </Button>
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
            <UpdateProfilePatient open={isOpen} setOpen={setIsOpen} patientData={patientData} refetch={refetch} />
         </CardContent>
      </Card>
   );
}
