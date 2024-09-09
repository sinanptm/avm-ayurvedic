import { getDoctors } from "@/lib/api/admin/authorizedRoutes"
import {IDoctor, ErrorResponse, PaginatedResult } from "@/types"
import {  useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"


export const  useGetDoctorsAdmin = (offset:number,limit:number)=>{
    return useQuery<PaginatedResult<IDoctor>,AxiosError<ErrorResponse>>({
        queryFn:()=>getDoctors(offset,limit),
        queryKey:["doctors",{limit,offset}]
    })
}