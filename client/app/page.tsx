import AboutAyurveda from "@/components/home/AboutAyurveda";
import ImageSlider from "@/components/home/ImageSlider";
import WhyUs from "@/components/home/WhyUs";
import dynamic from "next/dynamic";
import Loader  from "@/components/common/Loader";

const  FeaturesList = dynamic(()=>import("@/components/home/FeatureList"),{
   loading:()=><Loader />,
})


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
