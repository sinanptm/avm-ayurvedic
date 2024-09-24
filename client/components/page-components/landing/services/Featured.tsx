import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Featured = () => {
   return (
      <div className="py-8">
         <h2 className="text-3xl font-bold text-center mb-8">Our Featured Services</h2>
         <div className="grid gap-8">
            <Card className="mt-8">
               <CardHeader>
                  <CardTitle>Advanced Ayurvedic Diagnostic Imaging</CardTitle>
               </CardHeader>
               <CardContent className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                     <Image
                        src="/assets/services/treatment-2.webp"
                        alt="Featured Service"
                        width={400}
                        height={300}
                        className="rounded-lg object-cover w-full h-auto"
                     />
                  </div>
                  <div className="md:w-1/2">
                     <h3 className="text-xl font-semibold mb-2">Advanced Ayurvedic Diagnostic Imaging</h3>
                     <p className="mb-4">
                        Our state-of-the-art imaging center provides comprehensive diagnostic services using the latest
                        technology, integrated with Ayurvedic principles. From MRI and CT scans to ultrasound and
                        X-rays, we offer accurate and timely results to support your holistic healthcare needs.
                     </p>
                     <Button variant={"outline"} className="cursor-pointer">
                        Book Now
                     </Button>
                  </div>
               </CardContent>
            </Card>

            <Card className="mt-8">
               <CardHeader>
                  <CardTitle>Efficient Video Call Service</CardTitle>
               </CardHeader>
               <CardContent className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2 order-2 md:order-1">
                     <h3 className="text-xl font-semibold mb-2">Efficient Video Call Service</h3>
                     <p className="mb-4">
                        Connect with our Ayurvedic experts from the comfort of your home. Our video call services
                        provide you with personalized consultations, follow-ups, and treatment plans tailored to your
                        needs.
                     </p>
                     <Button variant={"outline"} className="cursor-pointer">
                        Book Now
                     </Button>
                  </div>
                  <div className="md:w-1/2 order-1 md:order-2">
                     <Image
                        src="/assets/3D/online-consulting.jpg"
                        alt="Video Call Service"
                        width={400}
                        height={300}
                        className="rounded-lg object-cover w-full h-auto"
                     />
                  </div>
               </CardContent>
            </Card>
         </div>

         <h2 className="text-3xl font-bold text-center mt-12 mb-8">Our Ayurvedic Products</h2>
         <div className="grid gap-8 md:grid-cols-2">
            <Card>
               <CardHeader>
                  <CardTitle>Herbal Medicines</CardTitle>
               </CardHeader>
               <CardContent>
                  <p className="mb-4">
                     Our range of herbal medicines is formulated using traditional Ayurvedic principles and high-quality
                     natural ingredients. These products are designed to promote health and well-being, offering natural
                     remedies for various conditions.
                  </p>
                  <Button variant={"outline"} className="cursor-pointer">
                     Explore Products
                  </Button>
               </CardContent>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle>Ayurvedic Supplements</CardTitle>
               </CardHeader>
               <CardContent>
                  <p className="mb-4">
                     Our Ayurvedic supplements provide a natural way to support your body&apos;s health and vitality.
                     They are crafted to enhance your overall wellness, boost immunity, and provide essential nutrients.
                  </p>
                  <Button variant={"outline"} className="cursor-pointer">
                     Explore Supplements
                  </Button>
               </CardContent>
            </Card>
         </div>
      </div>
   );
};

export default Featured;
