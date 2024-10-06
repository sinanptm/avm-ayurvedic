import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { SliderImages } from "@/constants";

const HeroSection = () => {
  return (
    <Card className="mb-12">
      <CardContent className="flex flex-col md:flex-row items-center p-6">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <Image
            src={SliderImages[0]}
            alt="AVM Ayurveda"
            width={500}
            height={300}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="md:w-1/2 md:pl-6">
          <h2 className="text-2xl font-semibold mb-4">Embracing Holistic Wellness</h2>
          <p className="text-lg">
            At AVM Ayurveda, we're dedicated to reviving the ancient wisdom of Ayurveda
            and integrating it with modern healthcare practices. Our goal is to guide you on a
            journey of holistic healing and self-discovery.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroSection;
