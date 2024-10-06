import AboutAyurveda from "@/components/page-components/landing/home/AboutAyurveda";
import ImageSlider from "@/components/page-components/landing/home/ImageSlider";
import WhyUs from "@/components/page-components/landing/home/WhyUs";
import dynamic from "next/dynamic";
import { Spinner } from "@/components/skeletons/spinner";
import { Metadata } from "next";

const FeaturesList = dynamic(() => import("@/components/page-components/landing/home/FeatureList"), {
   loading: () => <Spinner className="w-10 h-10 justify-center items-center" size="md" />,
});

export const metadata: Metadata = {
   keywords: ["Ayurveda", "Holistic Health", "Our Mission", "Ayurvedic Center", "Ayurvedic Doctors", "Natural medicine"],
   description: " home page of Appointment a website booking and video call consultation, an ayurveda hospital"
}

const HomePage = () => {
   return (
      <section className="mx-auto ">
         <ImageSlider />
         <AboutAyurveda />
         <WhyUs />
         <FeaturesList />
      </section>
   );
};

export default HomePage;
