import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { SliderImages } from "@/constants";

const HeroSection = () => {
  const randomIndex = Math.floor(Math.random() * SliderImages.length);
  const randomImage = SliderImages[randomIndex];

  return (
    <Card className="mb-8 overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={randomImage}
                alt="AVM Ayurveda"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="md:w-1/2 p-6 flex flex-col justify-center">
            <h2 className="text-xl font-semibold mb-2">Embracing Holistic Wellness</h2>
            <p className="text-sm text-muted-foreground">
              At Avm Ayurveda, we&apos;re dedicated to reviving the ancient wisdom of Ayurveda
              and integrating it with modern healthcare practices. Our goal is to guide you on a
              journey of holistic healing and self-discovery.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroSection;