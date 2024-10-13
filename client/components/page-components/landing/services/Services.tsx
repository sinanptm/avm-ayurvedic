import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { AppointmentTypes } from "@/constants";
import { memo } from "react";

const Services = () => {
   return (
      <div className="py-8">
         <div className="grid gap-8 md:grid-cols-2">
            {AppointmentTypes.map((service, index) => (
               <Card key={index}>
                  <CardHeader>
                     <CardTitle className="flex items-center gap-2">
                        <Image
                           src={service.image}
                           alt={service.title}
                           width={24}
                           height={24}
                           className="h-6 w-6 rounded-full object-cover"
                        />
                        {service.title}
                     </CardTitle>
                     <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <ul className="list-disc pl-5 space-y-2">
                        {service.details.map((detail, idx) => (
                           <li key={idx}>{detail}</li>
                        ))}
                     </ul>
                  </CardContent>
               </Card>
            ))}
         </div>
      </div>
   );
};

export default memo(Services);
