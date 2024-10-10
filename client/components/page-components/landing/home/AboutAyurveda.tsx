import Image from "next/image";
import { memo } from "react";

const AboutAyurveda = () => {
   return (
      <div className="flex flex-col md:flex-row mt-14">
         <div className="w-full lg:w-1/2 p-6 lg:p-12 px-9">
            <h2 className="text-4xl font-bold mb-6">Discover the Power of Ayurveda</h2>
            <p className="mb-8 indent-10 text-xl">
               Ayurveda, the timeless science of life, offers a comprehensive and natural approach to health and
               well-being. Grounded in nature, it harmonizes the body, mind, and soul through customized therapies,
               herbal remedies, and mindful practices. We prioritize natural healing, avoiding allopathic medicines with
               potential side effects.
            </p>
            <p className="mb-4 indent-10 text-xl">
               With over a century of rich heritage and expertise, we provide exceptional service rooted in tradition
               and excellence. Our facility also offers Kalari classes, preserving this ancient martial art as part of a
               holistic lifestyle. Embrace Ayurveda and Kalari with us for a balanced, vibrant life free from the
               drawbacks of modern medicine.
            </p>
         </div>
         <div className="relative h-[200px] sm:h-[400px] md:h-[700px]md:w-[150px] w-full lg:w-1/2">
            <Image
               src="/assets/images/ayurveda1.jpg"
               alt="Ayurveda herbs and treatments"
               fill
               className="object-cover"
            />
         </div>
      </div>
   );
};

export default memo(AboutAyurveda);
