'use client';

import Image from "next/image";
import { memo } from "react";
import { motion } from "framer-motion";

const services = [
   {
     title: "Hospital Services",
     description: "Our hospital services provide comprehensive care for various medical needs. From routine check-ups to emergency care, our facilities are equipped with state-of-the-art technology and staffed by experienced professionals.",
     image: "/assets/images/hospital.png",
   },
   {
     title: "Ambulance Services",
     description: "Our ambulance services ensure quick and efficient transportation to medical facilities. Equipped with advanced life support systems and staffed by skilled paramedics, we provide reliable emergency medical transport.",
     image: "/assets/images/ambulance.png",
   },
   {
     title: "Chat with Doctor",
     description: "Our chat services allow you to connect with experienced doctors from the comfort of your home. Get personalized medical advice, answers to your questions, and ongoing support through our secure chat platform.",
     image: "/assets/images/chat.png",
   },
   {
     title: "Video Call Section",
     description: "Experience seamless virtual consultations with our doctors through video calls. Schedule appointments, discuss your health concerns, and receive expert guidance in real-time.",
     image: "/assets/images/video.png",
   },
 ];

const Featured = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-3xl font-extrabold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Services
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              className="bg-dark-200 overflow-hidden shadow rounded-lg"
              variants={itemVariants}
            >
              <div className="p-6">
                <motion.div 
                  className="flex justify-center mb-4"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </motion.div>
                <h3 className="text-lg font-medium text-center mb-2">{service.title}</h3>
                <p className="text-sm text-gray-400 text-center">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default memo(Featured);