import { MultiSelect } from "@/components/ui/multi-select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAddSlotsDoctor } from "@/lib/hooks/slots/useSlot";
import { AvailableTimes } from "../view/tab/doctor/DoctorSlotsTabContent";

const availableTimeOptions = Object.values(AvailableTimes).flat().map(time => ({ label: time, value: time }));

const SlotManager = () => {
    const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
    const { mutate: addSlots, isPending } = useAddSlotsDoctor();
  
    const handleAddSlotChange = (slotsToAdd: string[]) => {
      setSelectedSlots(prevSlots => [...new Set([...prevSlots, ...slotsToAdd])]);
    };



    const handleAddSlot = ()=>{
        if(selectedSlots){
            // addSlots()
        }
    }
  
    const handleRemoveSlots = (slotsToRemove: string[]) => {
      setSelectedSlots(prevSlots => prevSlots.filter(slot => !slotsToRemove.includes(slot)));
    };
    
    return (
        <div className="space-y-4">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold">Manage Slots for All Days</h2>

            <div className="space-y-3">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <MultiSelect
                        options={availableTimeOptions}
                        onValueChange={handleAddSlotChange}
                        placeholder="Select slots to add"
                        disabled={isPending}
                        variant="destructive"
                        className="flex-1 bg-dark-400 text-white text-xs sm:text-sm"
                    />
                    <Button
                        onClick={handleAddSlot}
                        className="w-full sm:w-auto px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                        Add Slots to All Days
                    </Button>
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <MultiSelect
                        options={availableTimeOptions}
                        onValueChange={handleRemoveSlots}
                        placeholder="Select slots to remove"
                        variant="destructive"
                        className="flex-1 bg-dark-400 text-white text-xs sm:text-sm"
                    />
                    <Button
                        onClick={() => handleRemoveSlots([])}
                        className="w-full sm:w-auto px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                        Remove Slots from All Days
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default SlotManager;
