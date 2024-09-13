'use client';

import { useAddSlotsDoctor, useGetSlotsByDayDoctor, useDeleteDoctorByDay } from '@/lib/hooks/slots/useSlot';
import { Days } from '@/types';
import React, { useEffect, useState } from 'react';
import { RenderTimeSlots } from './RenderTimeSlots';
import ConfirmDeleteSlotsModal from '@/components/models/ConfirmDeleteSlotsModel';
import { AvailableTimes } from '@/constants';

type Props = {
  day: Days;
};

const TabContent = ({ day }: Props) => {
  const { data: slots, isLoading, refetch } = useGetSlotsByDayDoctor(day);
  const [selectedMorningSlots, setSelectedMorningSlots] = useState<string[]>([]);
  const [selectedAfternoonSlots, setSelectedAfternoonSlots] = useState<string[]>([]);
  const [selectedEveningSlots, setSelectedEveningSlots] = useState<string[]>([]);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [slotsToDelete, setSlotsToDelete] = useState<string[]>([]);

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
    setSlotsToDelete([slot]);
    setOpenConfirmDelete(true);
  };

  const handleAddAll = (times: string[]) => {
    if (!slots || slots.length === 0) return;
    const addAllSlots = times.filter(time => !slots.some(slot => slot.startTime === time));
    if (addAllSlots.length > 0) {
      addSlots({ slots: addAllSlots.map(time => ({ startTime: time })), day });
      setTimeout(() => refetch());
    }
  };
  
  const handleClearAll = (times: string[]) => {
    if (!slots || slots.length === 0) return;
  
    const clearAllSlots = times.filter(time => slots.some(slot => slot.startTime === time));

    if (clearAllSlots.length > 0) {
      setSlotsToDelete(clearAllSlots);
      setOpenConfirmDelete(true);
    }
  };

  const handleConfirmDelete = () => {
    deleteSlots({ slots: slotsToDelete.map(time => ({ startTime: time })), day });
    setOpenConfirmDelete(false);
    setSlotsToDelete([]);
    setTimeout(() => refetch());
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
          handleAddSlot,
          handleRemoveSlot,
          () => handleAddAll(AvailableTimes.Morning),
          () => handleClearAll(AvailableTimes.Morning)
        )}
        {RenderTimeSlots(
          AvailableTimes.Afternoon,
          "Afternoon Slots",
          selectedAfternoonSlots,
          isPending,
          isDeleting,
          handleAddSlot,
          handleRemoveSlot,
          () => handleAddAll(AvailableTimes.Afternoon),
          () => handleClearAll(AvailableTimes.Afternoon)
        )}
        {RenderTimeSlots(
          AvailableTimes.Evening,
          "Evening Slots",
          selectedEveningSlots,
          isPending,
          isDeleting,
          handleAddSlot,
          handleRemoveSlot,
          () => handleAddAll(AvailableTimes.Evening),
          () => handleClearAll(AvailableTimes.Evening)
        )}
      </div>
      <ConfirmDeleteSlotsModal 
        open={openConfirmDelete}
        setOpen={setOpenConfirmDelete}
        handleDeleteSlots={handleConfirmDelete}
      />
    </div>
  );
};

export default TabContent;
