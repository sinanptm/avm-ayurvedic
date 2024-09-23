import { withTempBaseUrl } from "@/lib/utils/withTempBaseUrl";
import patientAxiosInstance from "../patient/authorizedRoutes";
import doctorAxiosInstance from "../doctor/authorizedRoutes";

const patientBaseUrl = `${process.env.NEXT_PUBLIC_API_URL}/chats/patient`;
const doctorBaseUrl = `${process.env.NEXT_PUBLIC_API_URL}/chats/doctor`;

// Patient Routes
export const getPatientChats = async () => {
    const response = await withTempBaseUrl(patientAxiosInstance, patientBaseUrl, {
        method: "GET",
        url: "/"
    });
    return response.data;
};

export const createChatPatient = async (doctorId: string) => {
    const response = await withTempBaseUrl(patientAxiosInstance, patientBaseUrl, {
        method: "POST",
        url: "/",
        data: { doctorId }
    });
    return response.data;
};

export const createMessagePatient = async (chatId: string, message: string, doctorId: string) => {
    const response = await withTempBaseUrl(patientAxiosInstance, patientBaseUrl, {
        method: "POST",
        url: `/message`,
        data: { chatId, message, doctorId }
    });
    return response.data;
};

export const getMessagesOfPatientChat = async (chatId: string, limit: number) => {
    const response = await withTempBaseUrl(patientAxiosInstance, patientBaseUrl, {
        method: "GET",
        url: `/message/${chatId}?limit=${limit}`
    });
    return response.data;
};

// Doctor Routes
export const getDoctorChats = async () => {
    const response = await withTempBaseUrl(doctorAxiosInstance, doctorBaseUrl, {
        method: "GET",
        url: "/"
    });
    return response.data;
};

export const createChatDoctor = async (patientId: string) => {
    const response = await withTempBaseUrl(doctorAxiosInstance, doctorBaseUrl, {
        method: "POST",
        url: "/",
        data: { patientId }
    });
    return response.data;
};

export const createMessageDoctor = async (chatId: string, message: string, patientId: string) => {
    const response = await withTempBaseUrl(doctorAxiosInstance, doctorBaseUrl, {
        method: "POST",
        url: `/message`,
        data: { chatId, message, patientId }
    });
    return response.data;
};

export const getMessagesOfDoctorChat = async (chatId: string, limit: number) => {
    const response = await withTempBaseUrl(doctorAxiosInstance, doctorBaseUrl, {
        method: "GET",
        url: `/message/${chatId}?limit=${limit}`
    });
    return response.data;
};
