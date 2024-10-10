import Image from "next/image";
import { GuaranteeListHonePage } from "@/constants";
import { memo } from "react";

const WhyUs = () => {
   return (
      <section className="flex flex-col mt-14">
         <h2 className="text-2xl font-bold text-center mb-6 text-slate-100">Why Choose Our Services?</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 my-8">
            {GuaranteeListHonePage.map((item, i) => (
               <div key={item.heading + i} className="flex flex-col items-center text-center align-middle p-2">
                  <Image src={item.src} alt={item.heading} width={80} height={80} className="mx-auto mb-4" />
                  <h1 className="text-lg font-semibold leading-tight">{item.heading}</h1>
                  <p className="text-sm text-slate-100 mt-2">{item.text}</p>
               </div>
            ))}
         </div>
      </section>
   );
};

export default memo(WhyUs);
