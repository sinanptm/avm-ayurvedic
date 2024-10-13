import React, { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Coffee, Moon, Sun } from "lucide-react";

const tips = [
   {
      title: "Rise with the Sun",
      description: "Wake up early to align with nature`s rhythms and boost productivity.",
      icon: Sun,
   },
   {
      title: "Practice Oil Pulling",
      description: "Swish oil in your mouth for 10-15 minutes daily to improve oral health.",
      icon: Coffee,
   },
   {
      title: "Follow a Consistent Routine",
      description: "Maintain regular times for meals, work, and sleep to balance your doshas.",
      icon: Clock,
   },
   {
      title: "Get Adequate Sleep",
      description: "Aim for 7-9 hours of sleep per night to support overall health and well-being.",
      icon: Moon,
   },
];

const LifestyleTips = () => {
   return (
      <section className="py-12 px-4 sm:px-6 lg:px-8">
         <h2 className="text-3xl font-bold text-center mb-8">Ayurvedic Lifestyle Tips</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((tip, index) => (
               <Card key={index}>
                  <CardHeader>
                     <div className="flex items-center space-x-2">
                        <tip.icon className="w-6 h-6 text-green-500" />
                        <CardTitle>{tip.title}</CardTitle>
                     </div>
                  </CardHeader>
                  <CardContent>
                     <p>{tip.description}</p>
                  </CardContent>
               </Card>
            ))}
         </div>
      </section>
   );
};

export default memo(LifestyleTips);
