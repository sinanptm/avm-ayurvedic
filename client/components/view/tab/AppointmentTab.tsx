'use client'

import { Tabs } from "@/components/ui/tabs-v2";
import TabContent from "@/components/doctor/appointments/AppointmentTabContent";

export default function TabSection() {
  
  const tabs = [{title:"Pending Appointments", value:"PENDING"},{ title: 'Scheduled Appointments', value: 'SCHEDULED',}].map(({title,value}) => ({
    title,
    value,
    content: (
      <div>
        <TabContent />
      </div>
    ),
  }));

  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Manage Your Appointments</h1>
      <Tabs tabs={tabs} />
      <div className='my-14'></div>
    </div>
  );
}