import { withTempBaseUrl } from "@/lib/utils/withTempBaseUrl"
import doctorAxiosInstance from "../doctor/authorizedRoutes"
import { IPrescription } from "@/types/entities"

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/prescription`

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