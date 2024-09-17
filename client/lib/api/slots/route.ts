import { ISlot, Days } from "@/types";
import { withTempBaseUrl } from "@/lib/utils/withTempBaseUrl";
import doctorAxiosInstance from "../doctor/authorizedRoutes";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/slots`;

// =================================================================== //

export const addSlotsDoctor = async (slots: ISlot[], day: Days) => {
    const response = await withTempBaseUrl(doctorAxiosInstance, baseUrl, {
        method: 'POST',
        url: '/day',
        data: { slots, day },
    });
    return response.data;
};

export const deleteManyByDayDoctor = async (slots: ISlot[], day: Days) => {
    const response = await withTempBaseUrl(doctorAxiosInstance, baseUrl, {
        method: 'DELETE',
        url: '/day',
        data: { slots, day },
    });
    return response.data;
};

export const addSlotsAllDayDoctor = async (startTimes: string[]) => {
    const response = await withTempBaseUrl(doctorAxiosInstance, baseUrl, {
        method: 'POST',
        url: '/all-days',
        data: { startTimes },
    });
    return response.data;
};

export const deleteSlotsAllDayDoctor = async (startTimes: string[]) => {
    const response = await withTempBaseUrl(doctorAxiosInstance, baseUrl, {
        method: 'DELETE',
        url: '/all-days',
        data: { startTimes },
    });
    return response.data;
};

export const getSlotsByDayDoctor = async (day: Days) => {
    const response = await withTempBaseUrl(doctorAxiosInstance, baseUrl, {
        method: 'GET',
        url: `/doctor?day=${day}`,
    });
    return response.data;
};

export const getAllSlotsDoctor = async () => {
    const response = await withTempBaseUrl(doctorAxiosInstance, baseUrl, {
        method: 'GET',
        url: '/doctor',
    });
    return response.data;
};

// =================================================================== //

export const getSlotsOfDoctor = async (doctorId: string, date: string) => {
    const response = await withTempBaseUrl(doctorAxiosInstance, baseUrl, {
        method: 'GET',
        url: `/${doctorId}?date=${date}`,
    });
    return response.data;
};
