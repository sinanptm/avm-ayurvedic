import React from "react";
import AboutAyurveda from "@/components/AboutAyurveda";
import ImageSlider from "@/components/ImageSlider";
import AnimatedCard from "@/components/utils/AnimatedCard";
import { FeaturesCardsHomePage } from "@/constants";

const page = () => {
   return (
      <section className="mx-auto">
         <ImageSlider />
         <AboutAyurveda />
         <section className="mt-14">
            <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
            <div className="flex flex-wrap justify-center gap-11">
               {FeaturesCardsHomePage.map(({heading,key,image,link,linkText,text}) => (
                  <AnimatedCard 
                     heading={heading}
                     key={key}
                     image={image}
                     link={link}
                     linkText={linkText}
                     text={text}
                   />
               ))}
            </div>
         </section>
      </section>
   );
};
export default page;
