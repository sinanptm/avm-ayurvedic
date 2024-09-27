import { blockPatient, getPatients } from "@/lib/api/admin/authorizedRoutes";
import { ErrorResponse, MessageResponse, PaginatedResult } from "@/types";
import { IPatient } from "@/types/entities";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetPatientsAdmin = (offset: number, limit: number) => {
   return useQuery<PaginatedResult<IPatient>, AxiosError<ErrorResponse>>({
      queryKey: ["patient", { offset, limit }],
      queryFn: () => getPatients(offset, limit),
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
   });
};

export const useChangeStatusAdmin = () => {
   return useMutation<MessageResponse, AxiosError<ErrorResponse>, { id: string; isBlocked: boolean }>({
      mutationFn: ({ id, isBlocked }) => blockPatient(id, isBlocked),
      onError: (error) => console.log("error in changing status of patient ", error),
   });
};
