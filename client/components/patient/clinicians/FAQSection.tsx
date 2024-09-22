import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const FAQSection = () => (
   <div className="w-full max-w-6xl mx-auto mb-20 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
         <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg">What is Ayurveda?</AccordionTrigger>
            <AccordionContent className="text-base">
               Ayurveda is a holistic healing system that originated in India over 5,000 years ago. It focuses on
               balancing the mind, body, and spirit to promote overall health and prevent illness. Ayurveda emphasizes
               personalized treatments based on an individual&apos;s unique constitution or dosha.
            </AccordionContent>
         </AccordionItem>
         <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg">
               How long does an Ayurvedic treatment typically last?
            </AccordionTrigger>
            <AccordionContent className="text-base">
               The duration of Ayurvedic treatments varies depending on the individual and the condition being treated.
               Some treatments may last a few weeks, while others might continue for several months. Your Ayurvedic
               practitioner will create a personalized treatment plan based on your specific needs and health goals.
            </AccordionContent>
         </AccordionItem>
         <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg">Are Ayurvedic treatments safe?</AccordionTrigger>
            <AccordionContent className="text-base">
               Ayurvedic treatments are generally safe when administered by qualified practitioners. However, it&apos;s
               important to consult with a certified Ayurvedic doctor and inform them of any existing health conditions
               or medications you&apos;re taking. As with any medical treatment, there can be potential interactions or
               side effects, which is why personalized care and professional guidance are crucial.
            </AccordionContent>
         </AccordionItem>
         <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg">
               What can I expect during my first Ayurvedic consultation?
            </AccordionTrigger>
            <AccordionContent className="text-base">
               During your first Ayurvedic consultation, the practitioner will conduct a thorough assessment of your
               physical, mental, and emotional health. This may include pulse diagnosis, tongue examination, and
               detailed questions about your lifestyle, diet, and health history. Based on this evaluation, they will
               determine your dosha (constitution) and create a personalized treatment plan that may include dietary
               recommendations, herbal remedies, lifestyle changes, and therapeutic treatments.
            </AccordionContent>
         </AccordionItem>
      </Accordion>
   </div>
);
