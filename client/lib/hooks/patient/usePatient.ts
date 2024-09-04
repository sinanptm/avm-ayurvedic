import {
   getPatientProfile,
   updatePatientProfile,
} from "@/lib/api/patient/Autherisation";
import { ErrorResponse, IPatient, MessageResponse } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGetPatientProfile = () => {
   return useQuery<IPatient, AxiosError<ErrorResponse>>({
      queryKey: ["patientProfile"],
      queryFn: getPatientProfile,
      refetchInterval:15000
   });
};

export const useUpdatePatientProfile = () => {
   return useMutation<MessageResponse, AxiosError<ErrorResponse>, IPatient>({
      mutationFn: (patient) => updatePatientProfile(patient),
      onError: (error) => {
         console.log("Error in Updating Patient", error);
      },
   });
};
