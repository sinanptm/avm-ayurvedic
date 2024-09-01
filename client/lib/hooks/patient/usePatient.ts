import { getPatientProfile, updatePatientProfile } from "@/lib/services/api/patientProtectedApis";
import { ErrorResponse, IPatient, MessageResponse } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetPatientProfile = () => {
    return useQuery<IPatient, AxiosError<ErrorResponse>>({
        queryKey: ['patientProfile'],
        queryFn: getPatientProfile
    });
}

export const useUpdatePatientProfile = ()=>{
    return useMutation<MessageResponse,AxiosError<ErrorResponse>,IPatient>({
        mutationFn: updatePatientProfile,
        onError:(error)=>{
            console.log('Error in Updating Patient', error);
        }
    })
}