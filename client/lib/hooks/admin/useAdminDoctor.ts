import { getDoctors, verifyDoctor } from "@/lib/api/admin/authorizedRoutes";
import { IDoctor, ErrorResponse, PaginatedResult, MessageResponse } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetDoctorsAdmin = (offset: number, limit: number) => {
   return useQuery<PaginatedResult<IDoctor>, AxiosError<ErrorResponse>>({
      queryFn: () => getDoctors(offset, limit),
      queryKey: ["doctors", { limit, offset }],
   });
};

export const useVerifyDoctorAdmin = () => {
   return useMutation<MessageResponse, AxiosError<ErrorResponse>, { id: string }>({
      mutationFn: ({ id }) => verifyDoctor(id),
      onError: (error) => {
         console.log("Error in verifying doctor, ", error);
      },
   });
};
