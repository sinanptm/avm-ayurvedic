import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ISlot, Days, ErrorResponse, MessageResponse } from "@/types";
import { addSlotsDoctor, updateSlotsDoctor, getSlotsByDayDoctor, getAllSlotsDoctor } from "@/lib/api/slots/route";

export const useAddSlotsDoctor = () => {
   return useMutation<MessageResponse, AxiosError<ErrorResponse>, { slots: ISlot[], day: Days }>({
      mutationFn: ({ slots, day }) => addSlotsDoctor(slots, day),
      onError: (error) => {
         console.log("Error adding slots: ", error);
      },
   });
};

export const useUpdateSlotsDoctor = () => {
   return useMutation<MessageResponse, AxiosError<ErrorResponse>, ISlot>({
      mutationFn: (slot) => updateSlotsDoctor(slot),
      onError: (error) => {
         console.log("Error updating slot: ", error);
      },
   });
};

export const useGetSlotsByDayDoctor = (day: Days) => {
   return useQuery<ISlot[], AxiosError<ErrorResponse>>({
      queryFn: () => getSlotsByDayDoctor(day),
      queryKey: ["slotsByDay", day],
   });
};

export const useGetAllSlotsDoctor = () => {
   return useQuery<ISlot[], AxiosError<ErrorResponse>>({
      queryFn: () => getAllSlotsDoctor(),
      queryKey: ["allSlots"],
   });
};
