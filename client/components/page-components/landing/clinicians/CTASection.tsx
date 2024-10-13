import React, { memo } from "react";
import { ButtonV2 } from "@/components/button/ButtonV2";

const CTASection = () => (
   <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
      <h2 className="text-3xl font-bold mb-4">Start Your Ayurvedic Journey Today</h2>
      <p className="text-lg mb-6">
         Book a free consultation with one of our Ayurvedic experts and take the first step towards holistic wellness.
      </p>
      <ButtonV2 variant="gooeyRight" size="lg">
         Book Free Consultation
      </ButtonV2>
   </div>
);

export default memo(CTASection);
