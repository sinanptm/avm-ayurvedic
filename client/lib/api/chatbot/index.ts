import { withTempBaseUrl } from "@/lib/utils/withTempBaseUrl";
import apiUrls from "@/config/apiConfig";
import patientAxiosInstance from "../patient/authorizedRoutes";

const baseUrl = `${apiUrls.CHATBOT}`;

export const createChatMessage = async (message: string) => {
   const response = await withTempBaseUrl(patientAxiosInstance, baseUrl, {
      method: "POST",
      data: { message },
   });
   return response.data;
};
export const getChatHistory = async () => {
   const response = await withTempBaseUrl(patientAxiosInstance, baseUrl, {
      method: "GET",
   });
   return response.data;
};
