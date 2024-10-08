import { withTempBaseUrl } from "@/lib/utils/withTempBaseUrl";
import apiUrls from "@/config/apiConfig";
import adminAxiosInstance from "./authorizedRoutes";

export const getPatientGenderStatistics = async () => {
    const response = await withTempBaseUrl(adminAxiosInstance, apiUrls.ADMIN, {
        method: "GET",
        url: "/patient-gender",
    });
    return response.data;
};

export const getUsersStatisticsByMonth = async () => {
    const response = await withTempBaseUrl(adminAxiosInstance, apiUrls.ADMIN, {
        method: "GET",
        url: "/users-months",
    });
    return response.data;
};

export const getAppointmentsStatisticsByStatus = async () => {
    const response = await withTempBaseUrl(adminAxiosInstance, apiUrls.ADMIN, {
        method: "GET",
        url: "/appointment-status",
    });
    return response.data;
};

export const getAppointmentsByMonth = async () => {
    const response = await withTempBaseUrl(adminAxiosInstance, apiUrls.ADMIN, {
        method: "GET",
        url: "/appointment-month",
    });
    return response.data;
};

export const getSlotStatistics = async()=>{
    const response = await withTempBaseUrl(adminAxiosInstance, apiUrls.ADMIN,{
        method:"GET",
        url:"/slot-usage"
    });
    return response.data;
}