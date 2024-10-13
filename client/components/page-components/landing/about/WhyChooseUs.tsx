import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { memo } from "react";

const WhyChooseUs = () => {
   return (
      <Card className="mb-8">
         <CardHeader>
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
               <Image src="/assets/icons/stethoscope.svg" alt="Stethoscope" width={20} height={20} />
               Why Choose Ayurveda Health Center?
            </CardTitle>
         </CardHeader>
         <CardContent>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
               {[
                  "Expert Ayurvedic Physicians",
                  "Personalized Treatment Plans",
                  "State-of-the-art Facilities",
                  "Authentic Herbal Medicines",
                  "Holistic Wellness Programs",
                  "Ongoing Support and Education",
               ].map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 text-base text-muted-foreground">
                     <Image
                        src="/assets/icons/check.svg"
                        alt="Check"
                        width={16}
                        height={16}
                        className="flex-shrink-0"
                     />
                     {benefit}
                  </li>
               ))}
            </ul>
         </CardContent>
      </Card>
   );
};

export default memo(WhyChooseUs);
