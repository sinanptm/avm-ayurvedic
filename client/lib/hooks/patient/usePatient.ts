import { getPatientProfile, updatePatientProfile, updatePatientProfileImage } from "@/lib/utils/api/patientProtectedApis";
import { ErrorResponse, IPatient, MessageResponse } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetPatientProfile = () => {
    return useQuery<IPatient, AxiosError<ErrorResponse>>({
        queryKey: ['patientProfile'],
        queryFn: getPatientProfile
    });
}

export const useUpdatePatientProfile = () => {
    return useMutation<MessageResponse, AxiosError<ErrorResponse>, IPatient>({
        mutationFn: (patient) => updatePatientProfile(patient),
        onError: (error) => {
            console.log('Error in Updating Patient', error);
        }
    })
}

export const useUpdatePatientProfileImage = () => {
    return useMutation<MessageResponse, AxiosError<ErrorResponse>, { image: File }>({
        mutationFn: ({ image }) => updatePatientProfileImage(image),
        onError: (error) => {
            console.log('Error in Uploading Profile Image', error);
        }
    });
}