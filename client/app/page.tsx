import AboutAyurveda from "@/components/(patient)/home/AboutAyurveda";
import ImageSlider from "@/components/(patient)/home/ImageSlider";
import WhyUs from "@/components/(patient)/home/WhyUs";
import dynamic from "next/dynamic";
import Loader  from "@/components/common/Loader";

const  FeaturesList = dynamic(()=>import("@/components/(patient)/home/FeatureList"),{
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
