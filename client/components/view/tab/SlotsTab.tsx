"use client";

import { Days } from "@/types/enum";
import { Tabs } from "@/components/ui/tabs-v2";
import TabContent from "@/components/page-components/doctor/slots/SlotsTabContent";
import MultiSlots from "@/components/page-components/doctor/slots/MultiSlots";

export default function TabSection() {
   const tabs = Object.values(Days).map((day) => ({
      title: day.toUpperCase(),
      value: day.toUpperCase(),
      content: (
         <div>
            <TabContent day={day} />
         </div>
      ),
   }));

   return (
      <div className="space-y-4 sm:space-y-6">
         <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Manage Your Slots</h1>

         <MultiSlots />
         <Tabs tabs={tabs} activeTabClassName="bg-slate-300 bg-opacity-65" />
         <div className="my-14"></div>
      </div>
   );
}
