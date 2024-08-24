import AboutAyurveda from "@/components/home/AboutAyurveda";
import ImageSlider from "@/components/home/ImageSlider";
import FeaturesList from "@/components/home/FeatureList";
import WhyUs from "@/components/utils/WhyUs";

const Page = () => {
   return (
      <section className="mx-auto ">
         <ImageSlider />
         <AboutAyurveda />
         <WhyUs />
         <FeaturesList />
      </section>
   );
};

export default Page;
