'use client'

import { useAddSlotsDoctor, useGetSlotsByDayDoctor, useDeleteDoctorByDay } from '@/lib/hooks/slots/useSlot';
import { Days } from '@/types';
import React, { useEffect, useState } from 'react';
import { RenderTimeSlots } from './RenderTimeSlots'; // Updated import path to match your example

type Props = {
  day: Days;
};

export const AvailableTimes = {
  Morning: ["12:00 AM", "01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM", "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM"],
  Afternoon: ["12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"],
  Evening: ["05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"]
};

const TabContent = ({ day }: Props) => {
  const { data: slots, isLoading, refetch } = useGetSlotsByDayDoctor(day);
  const [selectedMorningSlots, setSelectedMorningSlots] = useState<string[]>([]);
  const [selectedAfternoonSlots, setSelectedAfternoonSlots] = useState<string[]>([]);
  const [selectedEveningSlots, setSelectedEveningSlots] = useState<string[]>([]);
  const { mutate: addSlots, isPending } = useAddSlotsDoctor();
  const { mutate: deleteSlots, isPending: isDeleting } = useDeleteDoctorByDay();

  useEffect(() => {
    if (!isLoading && slots) {
      setSelectedMorningSlots(slots.filter(el => AvailableTimes.Morning.includes(el.startTime || "")).map(el => el.startTime || ""));
      setSelectedAfternoonSlots(slots.filter(el => AvailableTimes.Afternoon.includes(el.startTime || "")).map(el => el.startTime || ""));
      setSelectedEveningSlots(slots.filter(el => AvailableTimes.Evening.includes(el.startTime || "")).map(el => el.startTime || ""));
    }
  }, [slots, isLoading]);

  const handleAddSlot = (slot: string) => {
    addSlots({ slots: [{ startTime: slot }], day });
    setTimeout(() => refetch(), 500);
  };

  const handleRemoveSlot = (slot: string) => {
    deleteSlots({ slots: [{ startTime: slot }], day });
    setTimeout(() => refetch(), 500);
  };

  const handleAddAll = (times: string[]) => {
    if (!slots || slots.length === 0) return;
  
    const addAllSlots = times.filter(time => !slots.some(slot => slot.startTime === time));

    if (addAllSlots.length > 0) {
      addSlots({ slots: addAllSlots.map(time => ({ startTime: time })), day });
      setTimeout(() => refetch(), 500);
    }
  };
  
  const handleClearAll = (times: string[]) => {
    if (!slots || slots.length === 0) return;
  
    const clearAllSlots = times.filter(time => slots.some(slot => slot.startTime === time));
  
    if (clearAllSlots.length > 0) {
      deleteSlots({ slots: clearAllSlots.map(time => ({ startTime: time })), day });
      setTimeout(() => refetch(), 500);
    }
  };
  

  return (
    <div className="p-2 sm:p-4 bg-dark-200 rounded-lg shadow-md">
      <h1 className="text-lg sm:text-xl font-medium mb-4 text-white">Slots for <span className='font-semibold'>{day.toUpperCase()}</span></h1>
      <div className="space-y-4">
        {RenderTimeSlots(
          AvailableTimes.Morning,
          "Morning Slots",
          selectedMorningSlots,
          isPending,
          isDeleting,
          (slot) => handleAddSlot(slot),
          (slot) => handleRemoveSlot(slot),
          () => handleAddAll(AvailableTimes.Morning),
          () => handleClearAll(AvailableTimes.Morning)
        )}
        {RenderTimeSlots(
          AvailableTimes.Afternoon,
          "Afternoon Slots",
          selectedAfternoonSlots,
          isPending,
          isDeleting,
          (slot) => handleAddSlot(slot),
          (slot) => handleRemoveSlot(slot),
          () => handleAddAll(AvailableTimes.Afternoon),
          () => handleClearAll(AvailableTimes.Afternoon)
        )}
        {RenderTimeSlots(
          AvailableTimes.Evening,
          "Evening Slots",
          selectedEveningSlots,
          isPending,
          isDeleting,
          (slot) => handleAddSlot(slot),
          (slot) => handleRemoveSlot(slot),
          () => handleAddAll(AvailableTimes.Evening),
          () => handleClearAll(AvailableTimes.Evening)
        )}
      </div>
    </div>
  );
};

export default TabContent;
