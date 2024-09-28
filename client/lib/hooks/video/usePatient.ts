import { getSectionByIdPatient, getSectionsInOneDayPatient } from "@/lib/api/video";
import { IVideoSection } from "@/types/entities";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorResponse, MessageResponse } from "@/types";

export const useGetSectionsInOneDayPatient = () => {
    return useQuery<IVideoSection[], AxiosError<ErrorResponse>>({
        queryKey: ["section-day-patient"],
        queryFn: () => getSectionsInOneDayPatient(),
    });
};

export const useGetSectionByIdPatient = (sectionId: string) => {
    return useQuery<IVideoSection, AxiosError<ErrorResponse>>({
        queryKey: ["section-patient", sectionId],
        queryFn: () => getSectionByIdPatient(sectionId),
    });
};


