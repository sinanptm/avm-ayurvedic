import { getSectionsInOneDayDoctor } from "@/lib/api/video";
import IVideoSection from "@/types/entities";
import { useQuery } from "@tanstack/react-query";

export const useGetSectionsInOneDayDoctor = () => {
    return useQuery<IVideoSection[]>({
        queryKey: ["section-day"],
        queryFn: () => getSectionsInOneDayDoctor(),
    });
};
