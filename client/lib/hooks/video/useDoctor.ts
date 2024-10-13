import { getAllSectionsDoctor, getSectionByIdDoctor, getSectionsInOneDayDoctor } from "@/lib/api/video";
import { IVideoSection } from "@/types/entities";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/types";

export const useGetSectionsInOneDayDoctor = () => {
   return useQuery<IVideoSection[], AxiosError<ErrorResponse>>({
      queryKey: ["section-day-doctor"],
      queryFn: () => getSectionsInOneDayDoctor(),
   });
};

export const useGetSectionByIdDoctor = (sectionId: string) => {
   return useQuery<{ section: IVideoSection }, AxiosError<ErrorResponse>>({
      queryKey: ["section-doctor", sectionId],
      queryFn: () => getSectionByIdDoctor(sectionId),
   });
};

export const useGetAllSectionsDoctor = () => {
   return useQuery<IVideoSection[], AxiosError<ErrorResponse>>({
      queryKey: ["sections-doctor"],
      queryFn: () => getAllSectionsDoctor(),
   });
};
