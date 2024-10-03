import { getPatientsOfDoctor } from "@/lib/api/doctor/authorizedRoutes"
import { ErrorResponse, PaginatedResult } from "@/types"
import { IPatient } from "@/types/entities"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useGetPatientsDoctor = (offset:number,limit:number)=>{
    return useQuery<PaginatedResult<IPatient>,AxiosError<ErrorResponse>>({
        queryKey:["doctor-patients",offset,limit],
        queryFn:()=>getPatientsOfDoctor(limit,offset)
    });
};