import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorResponse, MessageResponse } from "@/types";
import { ISlot } from "@/types/entities";
import { Days } from "@/types/enum";
import {
   addSlotsDoctor,
   getSlotsByDayDoctor,
   getAllSlotsDoctor,
   deleteManyByDayDoctor,
   addSlotsAllDayDoctor,
   deleteSlotsAllDayDoctor,
   getSlotsOfDoctor,
} from "@/lib/api/slots/route";

export const useAddSlotsDoctor = () => {
   return useMutation<MessageResponse, AxiosError<ErrorResponse>, { slots: ISlot[]; day: Days }>({
      mutationFn: ({ slots, day }) => addSlotsDoctor(slots, day),
      onError: (error) => {
         console.log("Error adding slots: ", error);
      },
   });
};

export const useDeleteDoctorByDay = () => {
   return useMutation<MessageResponse, AxiosError<ErrorResponse>, { slots: ISlot[]; day: Days }>({
      mutationFn: ({ slots, day }) => deleteManyByDayDoctor(slots, day),
      onError: (error) => {
         console.log("Error Deleting Slot: ", error);
      },
   });
};

export const useAddSlotsAllDaysDoctor = () => {
   return useMutation<MessageResponse, AxiosError<ErrorResponse>, { startTimes: string[] }>({
      mutationFn: ({ startTimes }) => addSlotsAllDayDoctor(startTimes),
   });
};

export const useDeleteSlotsAllDaysDoctor = () => {
   return useMutation<MessageResponse, AxiosError<ErrorResponse>, { startTimes: string[] }>({
      mutationFn: ({ startTimes }) => deleteSlotsAllDayDoctor(startTimes),
   });
};

export const useGetSlotsByDayDoctor = (day: Days) => {
   return useQuery<ISlot[], AxiosError<ErrorResponse>>({
      queryFn: () => getSlotsByDayDoctor(day),
      queryKey: ["slotsByDay", day],
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchInterval: 1000 * 30,
   });
};

export const useGetAllSlotsDoctor = () => {
   return useQuery<ISlot[], AxiosError<ErrorResponse>>({
      queryFn: () => getAllSlotsDoctor(),
      queryKey: ["allSlots", Object.values(Days)],
   });
};

// =================================================================== //

export const useGetSlotsOfDoctor = (doctorId: string, date: string) => {
   return useQuery<ISlot[], AxiosError<ErrorResponse>>({
      queryFn: () => getSlotsOfDoctor(doctorId, date),
      queryKey: ["doctorSlots", doctorId, date],
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
   });
};
