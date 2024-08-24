import React from "react";
import AboutAyurveda from "@/components/home/AboutAyurveda";
import ImageSlider from "@/components/home/ImageSlider";
import FeaturesList from "@/components/home/FeatureList";


export default function Component() {
  return (
    <section className="mx-auto ">
      <ImageSlider />
      <AboutAyurveda />
      <FeaturesList />
    </section>
  );
}