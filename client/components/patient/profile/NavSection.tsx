"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IPatient } from "@/types";

interface Props {
   setSection: (state: "profile" | "appointments" | "records") => void;
   patientData: IPatient;
}

const NavSection = ({ setSection, patientData }: Props) => {
   const handleClick = (path: "profile" | "appointments" | "records") => {
      setSection(path);
   };
   return (
      <Card className="overflow-hidden">
         <div className="bg-green-600 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
               <Image
                  src={patientData.profile||'/assets/icons/user.svg'}
                  alt="Patient profile picture"
                  width={100}
                  height={100}
                  className="rounded-full border-4 border-gray-800"
               />
               <div className="text-center sm:text-left">
                  <h1 className="text-2xl font-bold ">{patientData.name}</h1>
                  <p className="text-gray-200 opacity-75">{patientData.phone}</p>
               </div>
            </div>
         </div>
         <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
               <Button variant="outline" onClick={() => handleClick("profile")} className="flex-1">
                  Profile
               </Button>
               <Button variant="outline" onClick={() => handleClick("appointments")} className="flex-1">
                  Appointments
               </Button>
               <Button variant="outline" onClick={() => handleClick("records")} className="flex-1">
                  Medical Records
               </Button>
            </div>
         </CardContent>
      </Card>
   );
};

export default NavSection;
