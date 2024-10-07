import { getPatientGenderStatics } from "@/lib/api/admin/dashboardRoutes"
import { ErrorResponse } from "@/types"
import { PatientGenderStatics } from "@/types/statics"
import { useQuery } from "@tanstack/react-query"
import { AxiosError } from "axios"

export const useGetPatientGenderStatics = () => {
    return useQuery<{ statics: PatientGenderStatics }, AxiosError<ErrorResponse>>({
        queryKey: ["patient-gender"],
        queryFn: () => getPatientGenderStatics()
    });
}