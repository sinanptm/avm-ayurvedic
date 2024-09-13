'use client'

import { useState } from 'react';
import { Days } from "@/types";
import { Tabs } from "@/components/ui/tabs-v2";
import TabContent, { AvailableTimes } from "./DoctorSlotsTabContent";
import { MultiSelect } from "@/components/ui/multi-select";
import { Button } from "@/components/ui/button";

const allAvailableTimes = Object.values(AvailableTimes).flat().map(time => ({ label: time, value: time }));

export default function TabSection() {
  const [allSlots, setAllSlots] = useState<string[]>([]);

  const handleAddSlotToAll = (selectedOptions: string[]) => {
    setAllSlots(prev => [...new Set([...prev, ...selectedOptions])]);
  };

  const handleRemoveSlotFromAll = (selectedOptions: string[]) => {
    setAllSlots(prev => prev.filter(slot => !selectedOptions.includes(slot)));
  };

  const tabs = Object.values(Days).map((day) => ({
    title: day,
    value: day,
    content: (
      <div>
        <TabContent day={day} />
      </div>
    ),
  }));

  return (
    <div className="space-y-4 sm:space-y-6">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Manage Your Slots</h1>

      <div className="space-y-4">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold">Add or Remove Slot for All Days</h2>

        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <MultiSelect
              options={allAvailableTimes}
              onValueChange={handleAddSlotToAll}
              placeholder="Select slots to add"
              variant={'destructive'}
              className="flex-1 bg-dark-400 text-white text-xs sm:text-sm"
              />
            <Button
              onClick={() => handleAddSlotToAll([])}
              className="w-full sm:w-auto px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Add to All Days
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <MultiSelect
              options={allAvailableTimes}
              onValueChange={handleRemoveSlotFromAll}
              placeholder="Select slots to remove"
              variant={'destructive'}
              className="flex-1 bg-dark-400 text-white text-xs sm:text-sm"
            />
            <Button
              onClick={() => handleRemoveSlotFromAll([])}
              className="w-full sm:w-auto px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Remove from All Days
            </Button>
          </div>
        </div>
      </div>

      <Tabs tabs={tabs} />
      <div className='my-14'></div>
    </div>
  );
}