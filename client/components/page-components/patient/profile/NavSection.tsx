"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {IPatient}  from "@/types";
import UploadProfileModel from "@/components/models/patient/UploadProfileModel";
import { ButtonV2 } from "@/components/common/ButtonV2";

interface Props {
   setSection: (state: "profile" | "appointments") => void;
   patientData: IPatient;
   refetch: any;
}

export default function NavSection({ setSection, patientData, refetch }: Props) {
   const [isFileModel, setFileModel] = useState(false);

   const handleClick = (path: "profile" | "appointments") => {
      setSection(path);
   };

   const handleUploadClick = () => {
      setFileModel(!isFileModel);
   };

   return (
      <Card className="overflow-hidden">
         <div className="relative h-48">
            <Image
               src="/assets/images/ayurveda1.jpg"
               alt="Ayurveda banner"
               layout="fill"
               objectFit="cover"
               className="absolute inset-0"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
            <div className="absolute bottom-6 left-6 flex  flex-row items-center space-y-0 space-x-4">
               <div className="relative">
                  <Image
                     src={patientData.profile || "/assets/icons/user.svg"}
                     alt="Patient profile picture"
                     width={100}
                     height={100}
                     className="rounded-full border-4 border-white h-32 w-32"
                  />
                  <ButtonV2
                     variant="gooeyLeft"
                     className="absolute bottom-0 right-0 mb-2 mr-2 p-2 bg-white rounded-full"
                     onClick={handleUploadClick}
                  >
                     <Image src="/assets/icons/upload.svg" alt="Upload" width={24} height={24} />
                  </ButtonV2>
               </div>
               <div className="text-center sm:text-left">
                  <h1 className="text-2xl font-bold">{patientData.name}</h1>
                  <p>{patientData.phone}</p>
               </div>
            </div>
         </div>
         <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
               <ButtonV2 variant="shine" onClick={() => handleClick("profile")} className="flex-1">
                  Profile
               </ButtonV2>
               <ButtonV2 variant="shine" onClick={() => handleClick("appointments")} className="flex-1">
                  Appointments
               </ButtonV2>
            </div>
         </CardContent>
         <UploadProfileModel open={isFileModel} setOpen={setFileModel} patientData={patientData} refetch={refetch} />
      </Card>
   );
}