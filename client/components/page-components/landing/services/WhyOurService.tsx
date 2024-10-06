import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OurServices } from "@/constants";
import Image from "next/image";

const WhyOurService = () => {
   return (
      <Card className="mt-0">
         <CardHeader>
            <CardTitle className="flex items-center gap-2">
               <Image src={"/assets/icons/stethoscope.svg"} alt="Tick" height={23} width={23} className="h-7 w-7" />
               Why Choose Our Consulting Services?
            </CardTitle>
         </CardHeader>
         <CardContent>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
               {OurServices.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2">
                     <Image src={"/assets/icons/check.svg"} alt="Tick" height={23} width={23} className="h-6 w-6" />
                     {benefit}
                  </li>
               ))}
            </ul>
         </CardContent>
      </Card>
   );
};

export default WhyOurService;
