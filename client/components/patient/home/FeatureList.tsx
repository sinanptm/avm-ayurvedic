import React from "react";
import AnimatedCard from "@/components/common/AnimatedCard";
import { FeaturesCardsHomePage } from "@/constants";

const FeaturesList = () => {
   return (
      <div className="py-5 px-4 sm:px-6 lg:px-8 mt-9">
         <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row justify-center items-center md:items-stretch lg:items-stretch md:flex-row gap-x-4 gap-y-0">
               {FeaturesCardsHomePage.map((card, index) => (
                  <AnimatedCard
                     key={index}
                     heading={card.heading}
                     image={card.image}
                     link={card.link}
                     linkText={card.linkText}
                     text={card.text}
                     className="bg-gradient-to-b from-green-50 to-white dark:from-green-900 dark:to-gray-900 rounded-lg lg:mx-14 md-cus:mx-10 md:mx-2"
                  />
               ))}
            </div>
         </div>
      </div>
   );
};

export default FeaturesList;
