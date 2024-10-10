import Featured from "@/components/page-components/landing/services/Featured";
import Services from "@/components/page-components/landing/services/Services";
import WhyOurService from "@/components/page-components/landing/services/WhyOurService";
import { Spinner } from "@/components/skeletons/spinner";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { memo } from "react";

const FeaturesList = dynamic(() => import("@/components/page-components/landing/services/FeatureList"), {
   loading: () => <Spinner className="w-10 h-10 justify-center items-center" size="md" />,
});


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
            <FeaturesList />
         </div>
      </div>
   );
};

export default memo(ServicesPage);
