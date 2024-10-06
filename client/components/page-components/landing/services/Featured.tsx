'use client';

import { ButtonV2 } from "@/components/button/ButtonV2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Featured = () => {
   const router = useRouter();
   const redirect = (path: string = '/new-appointment') => {
      router.push(path)
   }

   return (
      <div className="py-7 bg-gradient-to-b from-background to-primary/5">
         <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary">
            Our Featured Services
         </h2>
         <div className="grid gap-12">
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
               <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                     <div className="md:w-1/2 relative h-64 md:h-auto">
                        <Image
                           src="/assets/services/treatment-2.webp"
                           alt="Advanced Ayurvedic Diagnostic Imaging"
                           fill
                           sizes="(max-width: 768px) 100vw, 50vw"
                           className="object-cover"
                           priority
                        />
                     </div>
                     <div className="md:w-1/2 p-8">
                        <h3 className="text-2xl font-semibold mb-4">Advanced Ayurvedic Diagnostic Imaging</h3>
                        <p className="mb-6 text-muted-foreground">
                           Our state-of-the-art imaging center provides comprehensive diagnostic services using the latest
                           technology, integrated with Ayurvedic principles. From MRI and CT scans to ultrasound and
                           X-rays, we offer accurate and timely results to support your holistic healthcare needs.
                        </p>
                        <ButtonV2 variant="gooeyRight" onClick={() => redirect()} className="cursor-pointer">
                           Book Now
                        </ButtonV2>
                     </div>
                  </div>
               </CardContent>
            </Card>

            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
               <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row-reverse">
                     <div className="md:w-1/2 relative h-64 md:h-auto">
                        <Image
                           src="/assets/3D/online-consulting.jpg"
                           alt="Video Call Service"
                           layout="fill"
                           objectFit="cover"
                        />
                     </div>
                     <div className="md:w-1/2 p-8">
                        <h3 className="text-2xl font-semibold mb-4">Efficient Video Call Service</h3>
                        <p className="mb-6 text-muted-foreground">
                           Connect with our Ayurvedic experts from the comfort of your home. Our video call services
                           provide you with personalized consultations, follow-ups, and treatment plans tailored to your
                           needs.
                        </p>
                        <ButtonV2 variant={"shine"} onClick={() => redirect()} className="cursor-pointer">
                           Book Now
                        </ButtonV2>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>

         <h2 className="text-4xl font-bold text-center mt-20 mb-12 bg-clip-text">
            Our Ayurvedic Products
         </h2>
         <div className="grid gap-8 md:grid-cols-2">
            <div>
               <Card className="h-full flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                     <CardTitle className="text-2xl">Herbal Medicines</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col justify-between flex-grow">
                     <p className="mb-6 text-muted-foreground">
                        Our range of herbal medicines is formulated using traditional Ayurvedic principles and high-quality
                        natural ingredients. These products are designed to promote health and well-being, offering natural
                        remedies for various conditions.
                     </p>
                     <Link href={"https://en.wikipedia.org/wiki/Herbal_medicine"}>
                        <ButtonV2 variant={"gooeyLeft"} className="cursor-pointer w-full md:w-auto">
                           Explore Products
                        </ButtonV2>
                     </Link>
                  </CardContent>
               </Card>
            </div>

            <div>
               <Card className="h-full flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                     <CardTitle className="text-2xl">Ayurvedic Supplements</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col justify-between flex-grow">
                     <p className="mb-6 text-muted-foreground">
                        Our Ayurvedic supplements provide a natural way to support your body's health and vitality.
                        They are crafted to enhance your overall wellness, boost immunity, and provide essential nutrients.
                     </p>
                     <Link href={"https://ayurwiki.org/Ayurwiki/Main_Page"}>
                        <ButtonV2 variant={"gooeyRight"} className="cursor-pointer w-full md:w-auto">
                           Explore Supplements
                        </ButtonV2>
                     </Link>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   );
};

export default Featured;