import { getPatientsOfDoctor } from "@/lib/api/doctor/authorizedRoutes"
import { ErrorResponse } from "@/types"
import { IPatient } from "@/types/entities"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useGetPatientsDoctor = ()=>{
    return useQuery<IPatient[],AxiosError<ErrorResponse>>({
        queryKey:["doctor-patients"],
        queryFn:()=>getPatientsOfDoctor()
    });
};