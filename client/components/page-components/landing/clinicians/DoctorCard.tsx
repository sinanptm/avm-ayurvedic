'use client';

import { memo } from "react";
import Image from "next/image";
import { IDoctor } from "@/types/entities";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonV2 } from "@/components/button/ButtonV2";

interface DoctorCardProps {
   doctor: IDoctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => (
   <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
      <div className="relative w-full pt-[56.25%] sm:pt-[75%] overflow-hidden">
         <Image
            src={doctor.image!}
            alt={doctor.name!}
            fill
            style={{ objectFit: "cover" }}
            className="transition-transform duration-300 hover:scale-105"
         />

         {doctor.isVerified && (
            <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
               <Image
                  src="/assets/icons/utils/award.svg"
                  width={16}
                  height={16}
                  alt="Verified"
                  className="w-4 h-4 sm:w-6 sm:h-6"
               />
            </div>
         )}
      </div>
      <CardContent className="p-4 sm:p-6 flex flex-col flex-grow">
         <h2 className="text-lg sm:text-2xl font-semibold mb-2 line-clamp-1">{doctor.name}</h2>
         <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
            {doctor.qualifications?.slice(0, 2).map((qualification, index) => (
               <Badge key={index} variant="secondary" className="text-xs">
                  {qualification}
               </Badge>
            ))}
            {doctor.qualifications && doctor.qualifications.length > 2 && (
               <Badge variant="secondary" className="text-xs">
                  +{doctor.qualifications.length - 2}
               </Badge>
            )}
         </div>
         <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4 text-xs sm:text-sm text-muted-foreground flex-grow">
            {doctor.phone && (
               <div className="flex items-center gap-1 sm:gap-2">
                  <Image src="/assets/icons/phone.svg" width={16} height={16} alt="Phone" className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="truncate">{doctor.phone}</span>
               </div>
            )}
            {doctor.email && (
               <div className="flex items-center gap-1 sm:gap-2">
                  <Image src="/assets/icons/email.svg" width={16} height={16} alt="Email" className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="truncate">{doctor.email}</span>
               </div>
            )}
         </div>
         <ButtonV2 variant={"shine"} className="w-full text-sm sm:text-base">Book Appointment</ButtonV2>
      </CardContent>
   </Card>
);

export default memo(DoctorCard);