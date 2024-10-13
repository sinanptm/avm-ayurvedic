import { createPrescription, updatePrescription } from "@/lib/api/prescription";
import { ErrorResponse, MessageResponse } from "@/types";
import { IPrescription } from "@/types/entities";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCreatePrescription = () => {
   return useMutation<MessageResponse, AxiosError<ErrorResponse>, { prescription: IPrescription }>({
      mutationFn: ({ prescription }) => createPrescription(prescription),
      onError: (error) => {
         console.log("error in creating prescription ", error);
      },
   });
};

export const useUpdatePrescription = () => {
   return useMutation<MessageResponse, AxiosError<ErrorResponse>, { prescription: IPrescription }>({
      mutationFn: ({ prescription }) => updatePrescription(prescription),
      onError: (error) => {
         console.log("error in updating prescription ", error);
      },
   });
};
