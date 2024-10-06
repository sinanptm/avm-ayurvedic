import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";

const values = [
  { title: "Holistic Approach", description: "We treat the whole person, not just symptoms." },
  { title: "Personalized Care", description: "Every treatment plan is tailored to the individual." },
  { title: "Ancient Wisdom, Modern Science", description: "We combine traditional Ayurveda with contemporary research." },
  { title: "Continuous Learning", description: "Our team stays updated with the latest in Ayurvedic medicine." },
];

const MissionAndValues = () => {
  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle>Our Mission and Values</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg mb-6">
          Our mission is to empower individuals to achieve optimal health and harmony through
          the timeless wisdom of Ayurveda, delivered with compassion and expertise.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {values.map((value, index) => (
            <div key={index} className="flex items-start">
              <Image src="/assets/icons/check.svg" alt="Check" width={24} height={24} className="mr-2 mt-1" />
              <div>
                <h4 className="font-semibold">{value.title}</h4>
                <p>{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MissionAndValues;
