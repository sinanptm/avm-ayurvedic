import { getPatients } from "@/lib/api/admin/authorizedRoutes";
import { ErrorResponse, IPatient, PaginatedResult } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetPatientsAdmin = (offset: number, limit: number) => {
    return useQuery<PaginatedResult<IPatient>, AxiosError<ErrorResponse>>({
        queryKey: ['patients', { offset, limit }],
        queryFn: () => getPatients(offset, limit),
        retry: false,
        refetchOnWindowFocus: false,   // Disable refetch on window focus
        refetchOnMount: false,         // Disable refetch on component mount
    });
};
