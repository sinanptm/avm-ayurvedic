import { getSectionByIdPatient, getSectionsInOneDayPatient } from "@/lib/api/video";
import IVideoSection from "@/types/entities";
import { useQuery } from "@tanstack/react-query";

export const useGetSectionsInOneDayPatient = () => {
    return useQuery<IVideoSection[]>({
        queryKey: ["section-day-patient"],
        queryFn: () => getSectionsInOneDayPatient(),
    });
};

export const useGetSectionByIdPatient = (sectionId: string) => {
    return useQuery<IVideoSection>({
        queryKey: ["section-patient",sectionId],
        queryFn: () => getSectionByIdPatient(sectionId),
    });
};


