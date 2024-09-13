'use client'
import { Button } from '@/components/ui/button';
import { Days } from '@/types';
import Image from 'next/image';
import React, { useState } from 'react';

type Props = {
  day: Days;
};

export const AvailableTimes = {
  Morning: ["12:00 AM", "01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM", "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM"],
  Afternoon: ["12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"],
  Evening: ["05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"]
};

const TabContent = ({ day }: Props) => {
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  const handleAddSlot = (slot: string) => {
    setSelectedSlots(prev => [...prev, slot]);
  };

  const handleRemoveSlot = (slot: string) => {
    setSelectedSlots(prev => prev.filter(time => time !== slot));
  };

  const handleAddAll = (times: string[]) => {
    setSelectedSlots(prev => [...new Set([...prev, ...times])]);
  };

  const handleClearAll = () => {
    setSelectedSlots([]);
  };

  const renderTimeSlots = (times: string[], label: string) => (
    <div className="mb-4">
      <h2 className="text-base sm:text-lg font-semibold mb-2 text-gray-300">{label}</h2>
      <div className="grid grid-cols-2 xxs:grid-cols-3 xs:grid-cols-4 sm:grid-cols-6 gap-1 sm:gap-2">
        {times.map((time, index) => (
          <Button
            key={index}
            variant={selectedSlots.includes(time) ? 'success' : 'outline'}
            className="w-full flex items-center justify-between py-1 px-2 text-[8px] xxs:text-[10px] xs:text-xs sm:text-sm h-auto min-h-[24px] xxs:min-h-[28px] xs:min-h-[32px]"
            onClick={() => selectedSlots.includes(time) ? handleRemoveSlot(time) : handleAddSlot(time)}
          >
            <span className="mr-1">{time}</span>
            <Image
              src={selectedSlots.includes(time) ? '/assets/icons/close.svg' : '/assets/icons/circle-plus.svg'}
              alt={selectedSlots.includes(time) ? "Remove slot" : "Add slot"}
              height={12}
              width={12}
              className="w-3 h-3"
            />
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-2 sm:p-4 bg-dark-200 rounded-lg shadow-md">
      <h1 className="text-lg sm:text-xl font-medium mb-4 text-white">Slots for <span className='font-semibold'>{day.toUpperCase()}</span></h1>
      <div className="space-y-4">
        {renderTimeSlots(AvailableTimes.Morning, "Morning Slots")}
        {renderTimeSlots(AvailableTimes.Afternoon, "Afternoon Slots")}
        {renderTimeSlots(AvailableTimes.Evening, "Evening Slots")}
        <div className="flex justify-between items-center mt-4">
          <Button
            variant="destructive"
            onClick={handleClearAll}
            className="text-[10px] xs:text-xs sm:text-sm px-2 py-1 h-auto"
          >
            Clear
          </Button>
          <Button
            variant="success"
            onClick={() => handleAddAll(Object.values(AvailableTimes).flat())}
            className="text-[10px] xs:text-xs sm:text-sm px-2 py-1 h-auto"
          >
            Add all
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TabContent;