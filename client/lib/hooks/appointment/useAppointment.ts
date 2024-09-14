import { getDoctorsList } from "@/lib/api/appointment"
import { ErrorResponse, IDoctor, PaginatedResult } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useGetDoctorsList = () => {
    return useQuery<PaginatedResult<IDoctor>, AxiosError<ErrorResponse>>({
        queryFn: () => getDoctorsList(),
        queryKey: ["doctors"]
    })
}

