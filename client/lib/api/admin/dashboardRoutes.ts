import { withTempBaseUrl } from "@/lib/utils/withTempBaseUrl";
import apiUrls from '@/config/apiConfig'
import adminAxiosInstance from "./authorizedRoutes";

export const getPatientGenderStatics = async () => {
    const response = await withTempBaseUrl(adminAxiosInstance, apiUrls.ADMIN, {
        method: "GET",
        url: "/patient-gender"
    });
    return response.data;
}