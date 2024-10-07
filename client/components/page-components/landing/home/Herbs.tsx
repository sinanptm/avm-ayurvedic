import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const herbs = [
  {
    name: 'Ashwagandha',
    description: 'Known for its stress-reducing and energy-boosting properties.',
    image: '/assets/services/ashwagandha.jpg',
  },
  {
    name: 'Turmeric',
    description: 'A powerful anti-inflammatory and antioxidant herb.',
    image: '/assets/services/turmeric.avif',
  },
  {
    name: 'Brahmi',
    description: 'Supports cognitive function and mental clarity.',
    image: '/assets/services/brahmi.jpg',
  },
  {
    name: 'Triphala',
    description: 'A blend of three fruits that aids digestion and detoxification.',
    image: '/assets/services/triphala.webp',
  },
]

export default function AyurvedicHerbs() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-8">Powerful Ayurvedic Herbs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {herbs.map((herb, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src={herb.image}
                alt={herb.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <CardHeader>
              <CardTitle>{herb.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{herb.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}