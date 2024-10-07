import AboutAyurveda from "@/components/page-components/landing/home/AboutAyurveda";
import ImageSlider from "@/components/page-components/landing/home/ImageSlider";
import WhyUs from "@/components/page-components/landing/home/WhyUs";
import dynamic from "next/dynamic";
import { Spinner } from "@/components/skeletons/spinner";
import { Metadata } from "next";
import FeaturedTreatments from "@/components/page-components/landing/home/FeaturedTreatment";
import { FAQSection } from "@/components/page-components/landing/clinicians/FAQSection";
import LifestyleTips from "@/components/page-components/landing/home/LifeStyleTips";
import AyurvedicHerbs from "@/components/page-components/landing/home/Herbs";

const FeaturesList = dynamic(() => import("@/components/page-components/landing/home/FeatureList"), {
   loading: () => <Spinner className="w-10 h-10 justify-center items-center" size="md" />,
});

export const metadata: Metadata = {
   keywords: [
      "Ayurveda", 
      "Holistic Health", 
      "Natural Healing", 
      "Ayurvedic Center", 
      "Ayurvedic Doctors", 
      "Herbal Medicine", 
      "Online Consultation", 
      "Video Consultation", 
      "Wellness", 
      "Natural Remedies", 
      "Ayurvedic Treatments", 
      "Health Tips",
      "Ayurvedic assistant",
      "Real time chat"
   ],
   description: "Discover holistic healing through Ayurveda. Book appointments with expert Ayurvedic doctors for online and video consultations. Learn about herbal treatments, wellness tips, and personalized care at our Ayurvedic center."
}


const HomePage = () => {
   return (
      <section className="mx-auto ">
         <ImageSlider />
         <AboutAyurveda />
         <WhyUs />
         <FeaturedTreatments />
         <LifestyleTips />
         <FAQSection />
         <AyurvedicHerbs />
         <FeaturesList />
      </section>
   );
};

export default HomePage;
