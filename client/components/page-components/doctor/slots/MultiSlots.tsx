import { MultiSelect } from "@/components/ui/multi-select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAddSlotsAllDaysDoctor, useDeleteSlotsAllDaysDoctor, useGetAllSlotsDoctor } from "@/lib/hooks/slots/useSlot";
import { toast } from "@/components/ui/use-toast";
import ConfirmDeleteSlotsModel from "@/components/models/ConfirmDeleteSlotsModel";
import { AvailableTimes } from "@/constants";
import { useQueryClient } from "@tanstack/react-query";
import { Days } from "@/types/enum";

const availableTimeOptions = Object.values(AvailableTimes)
   .flat()
   .map((time) => ({ label: time, value: time }));

const SlotManager = () => {
   const [slotsToAdd, setSlotsToAdd] = useState<string[]>([]);
   const [slotsToRemove, setSlotsToRemove] = useState<string[]>([]);
   const [isDeleteModelOpen, setDeleteModelOpen] = useState(false);
   const query = useQueryClient();
   const { mutate: addSlots, isPending: isAdding } = useAddSlotsAllDaysDoctor();
   const { mutate: deleteSlots, isPending: isDeleting } = useDeleteSlotsAllDaysDoctor();

   const handleAddSlotChange = (slots: string[]) => {
      setSlotsToAdd(slots);
   };

   const handleRemoveSlotChange = (slots: string[]) => {
      setSlotsToRemove(slots);
   };

   const handleClickDelete = () => {
      if (deleteSlots.length > 0) {
         setDeleteModelOpen(true);
      }
   };

   const handleAddSlots = () => {
      if (slotsToAdd.length > 0) {
         addSlots(
            { startTimes: slotsToAdd },
            {
               onSuccess: () => {
                  setSlotsToAdd([]);
                  toast({
                     title: "Slots Added",
                     description: `Successfully added ${slotsToAdd.length} slots.`,
                     variant: "success",
                  });
                  setTimeout(() => {
                     Object.values(Days).forEach((el) => {
                        query.invalidateQueries({
                           queryKey: ["slotsByDay", el],
                        });
                     });
                  });
               },
               onError: (error) => {
                  console.error("Failed to add slots", error);
                  toast({
                     title: "Failed to add slots",
                     description: ` ${error.message}`,
                     variant: "destructive",
                  });
               },
            }
         );
      }
   };

   const handleDeleteSlots = () => {
      if (slotsToRemove.length > 0) {
         deleteSlots(
            { startTimes: slotsToRemove },
            {
               onSuccess: () => {
                  setSlotsToRemove([]);
                  toast({
                     title: "Slots Removed",
                     description: `Successfully removed ${slotsToRemove.length} slots.`,
                     variant: "warning",
                  });
                  setDeleteModelOpen(false);
                  setTimeout(() => {
                     Object.values(Days).forEach((el) => {
                        query.invalidateQueries({
                           queryKey: ["slotsByDay", el],
                        });
                     });
                  });
               },
               onError: (error) => {
                  console.error("Failed to delete slots", error);
                  toast({
                     title: "Error",
                     description: `Failed to remove slots: ${error.message}`,
                     variant: "destructive",
                  });
               },
            }
         );
      }
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
                  disabled={isAdding}
                  variant="destructive"
                  className="flex-1 bg-dark-400 text-white text-xs sm:text-sm"
               />
               <Button
                  onClick={handleAddSlots}
                  className="w-full sm:w-auto px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm bg-green-700 text-white rounded hover:bg-green-600 transition-colors"
                  disabled={isAdding}
               >
                  {isAdding ? "Adding..." : "Add Slots to All Days"}
               </Button>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
               <MultiSelect
                  options={availableTimeOptions}
                  onValueChange={handleRemoveSlotChange}
                  placeholder="Select slots to remove"
                  disabled={isDeleting}
                  variant="destructive"
                  className="flex-1 bg-dark-400 text-white text-xs sm:text-sm"
               />
               <Button
                  onClick={handleClickDelete}
                  className="w-full sm:w-auto px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  disabled={isDeleting}
               >
                  {isDeleting ? "Removing..." : "Remove Slots from All Days"}
               </Button>
            </div>
         </div>
         <ConfirmDeleteSlotsModel
            open={isDeleteModelOpen}
            handleDeleteSlots={handleDeleteSlots}
            setOpen={setDeleteModelOpen}
         />
      </div>
   );
};

export default SlotManager;
