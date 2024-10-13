import AboutAyurveda from "@/components/page-components/landing/home/AboutAyurveda";
import ImageSlider from "@/components/page-components/landing/home/ImageSlider";
import WhyUs from "@/components/page-components/landing/home/WhyUs";
import { Metadata } from "next";
import FeaturedTreatments from "@/components/page-components/landing/home/FeaturedTreatment";
import FAQSection from "@/components/page-components/landing/clinicians/FAQSection";
import LifestyleTips from "@/components/page-components/landing/home/LifeStyleTips";
import AyurvedicHerbs from "@/components/page-components/landing/home/Herbs";
import { memo } from "react";
import OurGoals from "@/components/page-components/landing/home/OurGoals";
import { metadata as rootMeta } from "./layout";

export const metadata: Metadata = {
   ...rootMeta,
};

const HomePage = () => {
   return (
      <section className="mx-auto ">
         <ImageSlider />
         <AboutAyurveda />
         <WhyUs />
         <FeaturedTreatments />
         <OurGoals />
         <LifestyleTips />
         <FAQSection />
         <AyurvedicHerbs />
      </section>
   );
};

export default memo(HomePage);
