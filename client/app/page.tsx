import AboutAyurveda from "@/components/AboutAyurveda";
import ImageSlider from "@/components/ImageSlider";
import AnimatedCard from "@/components/utils/AnimatedCard";
import React from "react";

const page = () => {
   return (
      <section className="mx-auto">
         <ImageSlider />
         <AboutAyurveda />
         <AnimatedCard
            heading="Instant Appointments"
            key={21}
            image="/assets/3D/appointment.png"
            text="Book Your Appointment"
         />
      </section>
   );
};
export default page;
