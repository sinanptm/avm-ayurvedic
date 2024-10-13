"use client";

import Image from "next/image";
import { memo, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const AboutAyurveda = () => {
   const controls = useAnimation();
   const ref = useRef(null);
   const isInView = useInView(ref, { once: true });

   useEffect(() => {
      if (isInView) {
         controls.start("visible");
      }
   }, [controls, isInView]);

   return (
      <div className="flex flex-col lg:flex-row items-center mt-14 bg-dark-300 text-gray-200">
         <motion.div
            className="w-full lg:w-1/2 p-6 lg:p-12"
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
               hidden: { opacity: 0, x: -50 },
               visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
            }}
         >
            <h2 className="text-4xl font-bold mb-6 text-primary">Discover the Power of Ayurveda</h2>
            <p className="mb-8 text-xl leading-relaxed">
               Ayurveda, the timeless science of life, offers a comprehensive and natural approach to health and
               well-being. Grounded in nature, it harmonizes the body, mind, and soul through customized therapies,
               herbal remedies, and mindful practices. We prioritize natural healing, avoiding allopathic medicines with
               potential side effects.
            </p>
            <p className="mb-4 text-xl leading-relaxed">
               With over a century of rich heritage and expertise, we provide exceptional service rooted in tradition
               and excellence. Our facility also offers Kalari classes, preserving this ancient martial art as part of a
               holistic lifestyle. Embrace Ayurveda and Kalari with us for a balanced, vibrant life free from the
               drawbacks of modern medicine.
            </p>
         </motion.div>
         <motion.div
            className="relative w-full lg:w-1/2 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
            initial="hidden"
            animate={controls}
            variants={{
               hidden: { opacity: 0, scale: 0.8 },
               visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.2 } },
            }}
         >
            <Image src="/assets/images/old-doctor.png" alt="Ayurvedic Doctor" fill className="object-contain" />
         </motion.div>
      </div>
   );
};

export default memo(AboutAyurveda);
