import React from "react";
import AnimatedCard from "@/components/common/AnimatedCard";
import { FeaturesCardsHomePage } from "@/constants";

const FeaturesList = () => {
   return (
      <div className="py-5 px-4 sm:px-6 lg:px-8 mt-9">
         <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
               {FeaturesCardsHomePage.map((card, index) => (
                  <AnimatedCard
                     key={index}
                     heading={card.heading}
                     image={card.image}
                     link={card.link}
                     linkText={card.linkText}
                     text={card.text}
                     className="bg-gradient-to-b from-green-50 to-white dark:from-green-900 dark:to-gray-900 rounded-lg w-full max-w-sm"
                  />
               ))}
            </div>
         </div>
      </div>
   );
};

export default FeaturesList;
