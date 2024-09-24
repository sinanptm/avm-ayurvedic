import AboutAyurveda from "@/components/page-components/landing/home/AboutAyurveda";
import ImageSlider from "@/components/page-components/landing/home/ImageSlider";
import WhyUs from "@/components/page-components/landing/home/WhyUs";
import dynamic from "next/dynamic";
import Loader from "@/components/common/Loader";

const FeaturesList = dynamic(() => import("@/components/page-components/landing/home/FeatureList"), {
   loading: () => <Loader />,
});

const HomePage = () => {
   return (
      <section className="mx-auto ">
         <ImageSlider />
         <AboutAyurveda />
         <WhyUs />
         <FeaturesList />
         {/* <div className="text-2xl font-bold text-center my-28 mb-64">
            🚧 Hold your horses! 🐴
            <br />
            Iam currently working on some awesome animations and large items.
            <br />
            Check back soon for a breathtaking experience! 🌟
         </div> */}
      </section>
   );
};

export default HomePage;
