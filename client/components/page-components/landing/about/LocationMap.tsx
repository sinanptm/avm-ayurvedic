import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { memo } from "react";

const LocationMap = () => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Image
            src={'/assets/icons/map.svg'}
            height={23}
            width={23}
            alt="Location"
            className="h-5 w-5"
          />
          Our Location
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.875185958898!2d75.79679470162522!3d11.343826171470987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65e0faa44289d%3A0xf35a6458bc072465!2sAVM%20Hospital!5e0!3m2!1sen!2sin!4v1728189070741!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '0.5rem' }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
            <div className="bg-primary/5 p-4 rounded-lg">
              <h3 className="font-medium mb-2">How to reach us:</h3>
              <ul className="text-base space-y-1 text-muted-foreground">
                <li>• 15 minutes drive from Calicut International Airport</li>
                <li>• 30 minutes from Kozhikode Railway Station</li>
                <li>• Bus stop: Chelannur Bus Stand (2 min walk)</li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-primary/5 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Contact Information:</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-base">
                  <Image
                    src={'/assets/icons/map.svg'}
                    height={23}
                    width={23}
                    alt="Location"
                    className="h-4 w-4 text-primary"
                  />
                  <span>Chelannur, Kozhikode, Kerala 673616</span>
                </li>
                <li className="flex items-center gap-2 text-base">
                  <Image
                    src={'/assets/icons/phone.svg'}
                    height={23}
                    width={23}
                    alt="Location"
                    className="h-4 w-4 text-primary"
                  />
                  <span>04952262655</span>
                </li>
                <li className="flex items-center gap-2 text-base">
                  <Image
                    src={'/assets/icons/email.svg'}
                    height={23}
                    width={23}
                    alt="Location"
                    className="h-4 w-4 text-primary"
                  />
                  <span>avmayrveda@gmail.com</span>
                </li>
              </ul>
            </div>
            <div className="bg-primary/5 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Nearby Landmarks:</h3>
              <ul className="text-base space-y-1 text-muted-foreground">
                <li>• Chelannur Shiva Temple (0.5 km)</li>
                <li>• Peruvayal Bhagavathi Temple (2 km)</li>
                <li>• Kunnamangalam Town (5 km)</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(LocationMap);
