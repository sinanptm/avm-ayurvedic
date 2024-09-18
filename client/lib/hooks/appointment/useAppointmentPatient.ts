import IAppointment, { AppointmentStatus, ErrorResponse, PaginatedResult } from "@/types"
import { getAppointmentsPatient } from "@/lib/api/appointment"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useGetAppointmentsPatient = ( offset: number, limit: number,status?: AppointmentStatus) => {
    return useQuery<PaginatedResult<IAppointment>, AxiosError<ErrorResponse>>({
        queryKey: ["appointments", status, offset, limit],
        queryFn: () => getAppointmentsPatient(offset, limit,status)
    })
}
