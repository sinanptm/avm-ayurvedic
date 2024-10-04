import { getPatientMedicalHistory, getPatientsOfDoctor } from "@/lib/api/doctor/authorizedRoutes"
import { ErrorResponse, PaginatedResult } from "@/types"
import { IExtendedAppointment, IPatient } from "@/types/entities"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useGetPatientsDoctor = (offset: number, limit: number) => {
    return useQuery<PaginatedResult<IPatient>, AxiosError<ErrorResponse>>({
        queryKey: ["doctor-patients", offset, limit],
        queryFn: () => getPatientsOfDoctor(limit, offset)
    });
};

export const useGetMedicalHistory = (patientId: string, offset: number, limit: number) => {
    return useQuery<PaginatedResult<IExtendedAppointment>, AxiosError<ErrorResponse>>({
        queryKey: ["medical-history", offset, limit, patientId],
        queryFn: () => getPatientMedicalHistory(patientId, limit, offset)
    });
}