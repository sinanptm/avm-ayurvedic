import React from "react";
import { AyurvedaSection } from "@/components/patient/clinicians/AyurvedaSection";
import { TestimonialsSection } from "@/components/patient/clinicians/TestimonialsSection";
import { FAQSection } from "@/components/patient/clinicians/FAQSection";
import { CTASection } from "@/components/patient/clinicians/CTASection";
import DoctorPagination from "@/components/patient/clinicians/DoctorsSection";
import { DummyDoctors } from "@/constants";

const Page = async () => {
  // const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  // const response = await fetch(`${apiUrl}/doctors`, {
  //   next: { revalidate: 60 },
  // });
  // const data = await response.json();
  // console.log(JSON.stringify(data.items));
  
  

  return (
    <section className="py-12 bg-gradient-to-b from-primary/10 to-background">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-6">Our Ayurvedic Experts</h1>
        <p className="text-xl text-center mb-12 max-w-2xl mx-auto text-muted-foreground">
          Discover our team of skilled Ayurvedic doctors dedicated to your holistic well-being.
          We combine ancient wisdom with modern care for personalized healing.
        </p>
        <DoctorPagination initialData={DummyDoctors} />
        <AyurvedaSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </div>
    </section>
  );
}

export default Page;