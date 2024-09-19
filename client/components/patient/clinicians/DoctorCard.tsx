import React from "react";
import Image from "next/image";
import { IDoctor } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DoctorCardProps {
  doctor: IDoctor;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => (
  <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
    <div className="relative w-full pt-[75%] overflow-hidden">
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
            className="mr-2 w-8 h-w-8"
          />
        </div>
      )}
    </div>
    <CardContent className="p-6">
      <h2 className="text-2xl font-semibold mb-2 line-clamp-1">{doctor.name}</h2>
      <div className="flex flex-wrap gap-2 mb-4">
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
      <div className="space-y-2 mb-4 text-sm text-muted-foreground">
        {doctor.phone && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/icons/phone.svg"
              width={16}
              height={16}
              alt="Phone"
              className="mr-2 w-5 h-5"
            />
            <span className="truncate">{doctor.phone}</span>
          </div>
        )}
        {doctor.email && (
          <div className="flex items-center gap-2">
            <Image
              src="/assets/icons/email.svg"
              width={16}
              height={16}
              alt="Email"
              className="mr-2 w-5 h-5"
            />
            <span className="truncate">{doctor.email}</span>
          </div>
        )}
      </div>
      <Button className="w-full">Book Appointment</Button>
    </CardContent>
  </Card>
);