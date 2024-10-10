import { memo } from "react";
import AyurvedaSection from "@/components/page-components/landing/clinicians/AyurvedaSection";
import TestimonialsSection from "@/components/page-components/landing/clinicians/TestimonialsSection";
import FAQSection from "@/components/page-components/landing/clinicians/FAQSection";
import CTASection from "@/components/page-components/landing/clinicians/CTASection";
import DoctorsList from "@/components/page-components/landing/clinicians/DoctorsList";
import { DummyDoctors } from "@/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Our Clinicians ",
   description:
      "Meet our team of highly skilled Ayurvedic doctors offering holistic and personalized care for your well-being. Explore ancient healing practices combined with modern care techniques.",
   keywords: ["Ayurveda", "Ayurvedic Doctors", "Holistic Healing", "Personalized Care", "Natural Medicine"],
};

const Page = async () => {
   // const apiUrl = process.env.NEXT_PUBLIC_API_URL;
   // const response = await fetch(`${apiUrl}/doctors`, {
   //   next: { revalidate: 60,
   // });
   // const data = await response.json();

   return (
      <section className="py-12 bg-gradient-to-b from-primary/10 to-background">
         <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-6">Our Ayurvedic Experts</h1>
            <p className="text-xl text-center mb-12 max-w-2xl mx-auto text-muted-foreground">
               Discover our team of skilled Ayurvedic doctors dedicated to your holistic well-being. We combine ancient
               wisdom with modern care for personalized healing.
            </p>
            <DoctorsList initialData={DummyDoctors!} />
            <AyurvedaSection />
            <TestimonialsSection />
            <FAQSection />
            <CTASection />
         </div>
      </section>
   );
};

export default memo(Page);
