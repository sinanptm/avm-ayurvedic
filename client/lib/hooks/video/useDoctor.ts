import { getAllSectionsDoctor, getSectionByIdDoctor, getSectionsInOneDayDoctor } from "@/lib/api/video";
import IVideoSection from "@/types/entities";
import { useQuery } from "@tanstack/react-query";

export const useGetSectionsInOneDayDoctor = () => {
    return useQuery<IVideoSection[]>({
        queryKey: ["section-day-doctor"],
        queryFn: () => getSectionsInOneDayDoctor(),
    });
};

export const useGetSectionByIdDoctor = (sectionId: string) => {
    return useQuery<IVideoSection>({
        queryKey: ["section-doctor",sectionId],
        queryFn: () => getSectionByIdDoctor(sectionId),
    });
};

export const useGetAllSectionsDoctor = () => {
    return useQuery<IVideoSection[]>({
        queryKey: ["sections-doctor"],
        queryFn: () => getAllSectionsDoctor(),
    });
};
