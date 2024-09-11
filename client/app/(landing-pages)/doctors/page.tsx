import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Doctors",
};

const FindDoctors = () => {
   return (
      <section className="mx-16 flex flex-col sm:flex-row min-h-screen">
         <p className="w-2/3">
            Ayurveda, the timeless science of life, offers a comprehensive and natural approach to health and
            well-being. Grounded in nature, it harmonizes the body, mind, and soul through customized therapies, herbal
            remedies, and mindful practices. We prioritize natural healing, avoiding allopathic medicines with potential
            side effects.
         </p>
         <p className="w-1/3">
            With over a century of rich heritage and expertise, we provide exceptional service rooted in tradition and
            excellence. Our facility also offers Kalari classes, preserving this ancient martial art as part of a
            holistic lifestyle. Embrace Ayurveda and Kalari with us for a balanced, vibrant life free from the drawbacks
            of modern medicine.
         </p>
      </section>
   );
};

export default FindDoctors;
