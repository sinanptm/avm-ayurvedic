import AboutAyurveda from "@/components/AboutAyurveda";
import ImageSlider from "@/components/ImageSlider";
import React from "react";

const page = () => {
  return (
    <section className="mx-auto">
      <ImageSlider />
      <AboutAyurveda />
    </section>
  );
};

export default page;

const TextCards = () => {
  const Item = ({ title, description }: { title: string; description: string }) => (
    <div className="bg-white shadow-md rounded-lg p-4 w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-16px)]">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <Item title="Item 1" description="Description for Item 1" />
      <Item title="Item 2" description="Description for Item 2" />
      <Item title="Item 3" description="Description for Item 3" />
      <Item title="Item 4" description="Description for Item 4" />
    </div>
  );
};