import Featured from "@/components/page-components/landing/services/Featured";
import Services from "@/components/page-components/landing/services/Services";
import WhyOurService from "@/components/page-components/landing/services/WhyOurService";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Services",
   description: "Learn about our ayurvedic outpatient and inpatient consulting services",
};

const ServicesPage = () => {
   return (
      <div className="min-h-screen bg-background py-8">
         <h1 className="mb-8 text-3xl font-bold text-center">Our Consulting Services</h1>
         <div className="container mx-auto px-4 py-8">
            <Services />
            <WhyOurService />
            <Featured />
         </div>
      </div>
   );
};

export default ServicesPage;
