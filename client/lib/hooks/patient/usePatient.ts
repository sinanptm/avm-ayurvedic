import { getPatientProfile } from "@/lib/services/api/patientProtectedApis";
import { ErrorResponse, IPatient } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetPatientProfile = () => {
    return useQuery<IPatient, AxiosError<ErrorResponse>>({
        queryKey: ['patientProfile'],
        queryFn: getPatientProfile
    });
}
