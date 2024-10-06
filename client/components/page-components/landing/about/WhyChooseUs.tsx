import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const WhyChooseUs = () => {
  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Image src="/assets/icons/stethoscope.svg" alt="Stethoscope" width={24} height={24} />
          Why Choose Ayurveda Health Center?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Expert Ayurvedic Physicians",
            "Personalized Treatment Plans",
            "State-of-the-art Facilities",
            "Authentic Herbal Medicines",
            "Holistic Wellness Programs",
            "Ongoing Support and Education",
          ].map((benefit, index) => (
            <li key={index} className="flex items-center gap-2">
              <Image src="/assets/icons/check.svg" alt="Check" width={24} height={24} />
              {benefit}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default WhyChooseUs;
