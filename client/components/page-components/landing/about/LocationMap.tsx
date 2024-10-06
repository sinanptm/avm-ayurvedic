import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const LocationMap = () => {
  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle>Our Location</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.875185958898!2d75.79679470162522!3d11.343826171470987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65e0faa44289d%3A0xf35a6458bc072465!2sAVM%20Hospital!5e0!3m2!1sen!2sin!4v1728189070741!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
        <p className="text-lg">
          Visit us at: Chelannur, Kozhikode, Kerala 673616<br />
          Phone: 04952262655<br />
          Email: avmayrveda@gmail.com
        </p>
      </CardContent>
    </Card>
  );
};

export default LocationMap;
