"use client";

import Image from "next/image";
import { memo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const goals = [
   "Promote holistic healing through Ayurveda",
   "Provide personalized treatment plans",
   "Educate about natural lifestyle choices",
   "Integrate modern science with traditional wisdom",
   "Offer accessible Ayurvedic consultations",
];

const OurGoals = () => {
   return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-300">
         <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-primary">Our Goals</h2>
            <div className="flex flex-col lg:flex-row items-center gap-12">
               <motion.div
                  className="w-full lg:w-1/2"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
               >
                  <Image
                     src="/assets/images/our-goals.png"
                     alt="Our Goals"
                     width={600}
                     height={400}
                     className="rounded-lg shadow-lg"
                  />
               </motion.div>
               <motion.div
                  className="w-full lg:w-1/2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
               >
                  <Card className="bg-dark-200">
                     <CardHeader>
                        <CardTitle className="text-2xl font-semibold text-primary">
                           Striving for Excellence in Ayurvedic Care
                        </CardTitle>
                     </CardHeader>
                     <CardContent>
                        <ul className="space-y-4">
                           {goals.map((goal, index) => (
                              <motion.li
                                 key={index}
                                 className="flex items-start space-x-3"
                                 initial={{ opacity: 0, y: 20 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 transition={{ duration: 0.3, delay: 0.1 * index }}
                              >
                                 <Image
                                    className="h-6 w-6 text-green-500 flex-shrink-0 mt-1"
                                    src={"/assets/icons/check.svg"}
                                    height={23}
                                    width={23}
                                    alt="✅"
                                 />
                                 <span className="text-gray-200">{goal}</span>
                              </motion.li>
                           ))}
                        </ul>
                     </CardContent>
                  </Card>
               </motion.div>
            </div>
         </div>
      </section>
   );
};

export default memo(OurGoals);
