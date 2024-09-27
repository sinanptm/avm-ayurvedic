import { getSectionsInOneDayPatient } from "@/lib/api/video";
import IVideoSection from "@/types/entities";
import { useQuery } from "@tanstack/react-query";

export const useGetSectionsInOneDayPatient = () => {
    return useQuery<IVideoSection[]>({
        queryKey: ["section-day"],
        queryFn: () => getSectionsInOneDayPatient(),
    });
};
