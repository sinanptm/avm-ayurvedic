import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export const withTempBaseUrl = async (
    instance: AxiosInstance,
    newBaseUrl: string,
    config: AxiosRequestConfig
 ): Promise<AxiosResponse> => {
    const originalBaseUrl = instance.defaults.baseURL; 
 
    try {
       instance.defaults.baseURL = newBaseUrl;
       const response = await instance(config);
       return response;
    } finally {
       instance.defaults.baseURL = originalBaseUrl;
    }
 };