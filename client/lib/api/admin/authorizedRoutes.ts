import axios from "axios";

// Create an axios instance with base URL and default headers
const axiosInstance = axios.create({
   baseURL: `${process.env.NEXT_PUBLIC_API_URL}/admin`,
   headers: {
      "Content-Type": "application/json",
   },
   withCredentials: true,
});

axiosInstance.interceptors.request.use(
   (config) => {
      const token = JSON.parse(localStorage.getItem("auth") || "{}");
      if (token.adminToken) {
         config.headers.Authorization = `Bearer ${token.adminToken}`;
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
            const refreshResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/auth/refresh`, {
               withCredentials: true,
            });

            const newAccessToken = refreshResponse.data.accessToken;

            localStorage.setItem(
               "auth",
               JSON.stringify({
                  ...tokens,
                  adminToken: newAccessToken,
               })
            );

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return axiosInstance(originalRequest);
         } catch (refreshError: any) {
            if (refreshError.response.status===401) {
               const tokens = JSON.parse(localStorage.getItem("auth") || "{}");
               localStorage.setItem("auth", {
                  ...tokens,
                  adminToken: "",
               });
            }
            return Promise.reject(refreshError);
         }
      }

      return Promise.reject(error);
   }
);

export const getPatients = async (offset: number, limit: number) => {
   const response = await axiosInstance.get(`/patient?limit=${limit}&offset=${offset}`);
   return response.data;
};

export const blockPatient = async (id: string, isBlocked: boolean) => {
   const response = await axiosInstance.patch("/patient", { id, isBlocked });
   return response.data;
};

export const addDoctor = async (email:string)=>{
   const response = await axiosInstance.post('/doctor',{email});
   return response.data;
};

export const getDoctors = async(offset:number,limit:number)=>{
   const response = await axiosInstance.get(`/doctor?offset=${offset}&limit=${limit}`);
   return response.data;
}