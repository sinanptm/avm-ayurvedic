import { ISlot, Days } from "@/types";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/slots`,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = JSON.parse(localStorage.getItem("auth") || "{}");
        if (token.doctorToken) {
            config.headers.Authorization = `Bearer ${token.doctorToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: any) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const tokens = JSON.parse(localStorage.getItem("auth") || "{}");
                const refreshResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/doctor/auth/refresh`, {
                    withCredentials: true,
                });

                const newAccessToken = refreshResponse.data.accessToken;

                localStorage.setItem(
                    "auth",
                    JSON.stringify({
                        ...tokens,
                        doctorToken: newAccessToken,
                    })
                );

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return axiosInstance(originalRequest);
            } catch (refreshError: any) {
                if (refreshError.response.status === 401) {
                    const tokens = JSON.parse(localStorage.getItem("auth") || "{}");
                    localStorage.setItem("auth", {
                        ...tokens,
                        doctorToken: "",
                    });
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export const addSlotsDoctor = async (slots: ISlot[], day: Days) => {
    const response = await axiosInstance.post('/day', { slots, day });
    return response.data;
};


export const deleteManyByDayDoctor = async (slots:ISlot[],day:Days)=>{
    const response = await axiosInstance.delete('/day',{data:{
        slots,
        day
    }});
    return response.data
}



export const getSlotsByDayDoctor = async (day: Days) => {
    const response = await axiosInstance.get(`/doctor?day=${day}`);
    return response.data;
}

export const getAllSlotsDoctor = async () => {
    const response = await axiosInstance.get('/doctor');
    return response.data;
}