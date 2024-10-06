import React from "react";
import Link from "next/link";
import { ButtonV2 } from "@/components/button/ButtonV2";

export const AyurvedaSection = () => (
   <div className="w-full max-w-6xl mx-auto bg-primary/5 rounded-lg p-8 md:p-12 my-20">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">The Healing Power of Ayurveda</h2>
      <div className="space-y-6 text-base md:text-lg">
         <p>
            Ayurveda, one of the world&apos;s oldest holistic healing systems, originated in India over 5,000 years ago.
            It emphasizes the balance of the mind, body, and spirit to achieve optimal health. According to Ayurvedic
            teachings, true wellness is achieved by harmonizing your unique physical, mental, and emotional
            constitution, known as your dosha.
         </p>
         <p>
            Our doctors are dedicated to providing personalized care by blending traditional Ayurvedic methods with
            modern medicine. This includes practices like detoxification (Panchakarma), herbal treatments, dietary
            recommendations, and lifestyle guidance that address your individual imbalances and promote overall
            well-being.
         </p>
         <p>
            Whether you&apos;re seeking relief from chronic illness, looking to enhance your energy and vitality, or
            simply striving for better mental clarity, Ayurveda offers a holistic pathway to health. Our skilled
            practitioners will guide you in discovering the treatments that align with your body&apos;s unique needs.
         </p>
      </div>
      <div className="text-center mt-8">
         <ButtonV2 variant="gooeyLeft" size="lg" className="px-8 py-6 text-lg">
            <Link href={"https://en.wikipedia.org/wiki/Ayurveda"}>Learn More About Ayurveda</Link>
         </ButtonV2>
      </div>
   </div>
);
