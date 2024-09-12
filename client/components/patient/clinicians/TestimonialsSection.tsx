import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const TestimonialsSection = () => (
  <div className="mb-16">
    <h2 className="text-3xl font-bold text-center mb-8">What Our Patients Say</h2>
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardContent className="p-6">
          <p className="italic mb-4">
            &quot;The Ayurvedic treatments I received here have transformed my life. I feel more balanced and energized.&quot;
          </p>
          <p className="font-semibold">- Sarah M.</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <p className="italic mb-4">
            &quot;The doctors here are knowledgeable and compassionate. They understand your unique needs.&quot;
          </p>
          <p className="font-semibold">- John D.</p>
        </CardContent>
      </Card>
    </div>
  </div>
);
