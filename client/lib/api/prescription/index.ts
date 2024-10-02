import { withTempBaseUrl } from "@/lib/utils/withTempBaseUrl"
import doctorAxiosInstance from "../doctor/authorizedRoutes"
import { IPrescription } from "@/types/entities"
import apiUrls from "@/config/apiConfig";

const baseUrl = `${apiUrls.PRESCRIPTION}`

export const createPrescription = async (prescription: IPrescription) => {
    const response = await withTempBaseUrl(doctorAxiosInstance, baseUrl, {
        method: "POST",
        data: prescription
    });
    return response.data;
};
export const updatePrescription = async (prescription:IPrescription)=>{
    const response = await withTempBaseUrl(doctorAxiosInstance,baseUrl,{
        method:"PUT",
        data:prescription
    });
    return response.data;
}