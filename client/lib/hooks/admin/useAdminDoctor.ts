import { getDoctors, updateDoctor } from "@/lib/api/admin/authorizedRoutes";
import { ErrorResponse, PaginatedResult, MessageResponse } from "@/types";
import { IDoctor } from "@/types/entities";
import { DoctorsFilter } from "@/types/enum";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetDoctorsAdmin = (offset: number, limit: number, type: DoctorsFilter) => {
   return useQuery<PaginatedResult<IDoctor>, AxiosError<ErrorResponse>>({
      queryFn: () => getDoctors(offset, limit, type),
      queryKey: ["doctors", { limit, offset, type }],
      staleTime: 50000,
   });
};

export const useUpdateDoctorAdmin = () => {
   return useMutation<MessageResponse, AxiosError<ErrorResponse>, { doctor: IDoctor }>({
      mutationFn: ({ doctor }) => updateDoctor(doctor),
      onError: (error) => {
         console.log("Error in verifying doctor, ", error);
      },
   });
};
