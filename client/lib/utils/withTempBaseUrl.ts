import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export const withTempBaseUrl = async (
   instance: AxiosInstance,
   newBaseUrl: string,
   config: AxiosRequestConfig
): Promise<AxiosResponse> => {
   const updatedConfig = {
      ...config,
      baseURL: newBaseUrl,
   };
   try {
      const response = await instance(updatedConfig);
      return response;
   } catch (error) {
      throw error;
   }
};
