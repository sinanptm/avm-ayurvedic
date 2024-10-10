import React, { memo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Treatments } from '@/constants';

const FeaturedTreatments = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-8">Our Featured Treatments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Treatments.map((treatment, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src={treatment.image}
                alt={treatment.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <CardHeader>
              <CardTitle>{treatment.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{treatment.description}</CardDescription>
              <Button className="mt-4 w-full">Learn More</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
export default memo(FeaturedTreatments);