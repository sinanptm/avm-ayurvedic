import { withTempBaseUrl } from "@/lib/utils/withTempBaseUrl";
import patientAxiosInstance from "../patient/authorizedRoutes";
import doctorAxiosInstance from "../doctor/authorizedRoutes";
import apiUrls from "@/config/apiConfig";

const patientBaseUrl = `${apiUrls.VIDEO}/patient`;
const doctorBaseUrl = `${apiUrls.VIDEO}/doctor`;

export const getSectionsInOneDayPatient = async () => {
   const response = await withTempBaseUrl(patientAxiosInstance, patientBaseUrl, {
      method: "GET",
      url: `/day`,
   });
   return response.data;
};

export const getSectionsInOneDayDoctor = async () => {
   const response = await withTempBaseUrl(doctorAxiosInstance, doctorBaseUrl, {
      method: "GET",
      url: `/day`,
   });
   return response.data;
};

export const getSectionByIdPatient = async (sectionId: string) => {
   const response = await withTempBaseUrl(patientAxiosInstance, patientBaseUrl, {
      method: "GET",
      url: `/${sectionId}`,
   });
   return response.data;
};

export const getSectionByIdDoctor = async (sectionId: string) => {
   const response = await withTempBaseUrl(doctorAxiosInstance, doctorBaseUrl, {
      method: "GET",
      url: `/${sectionId}`,
   });
   return response.data;
};

export const getAllSectionsDoctor = async () => {
   const response = await withTempBaseUrl(doctorAxiosInstance, doctorBaseUrl, {
      method: "GET",
      url: `/`,
   });
   return response.data;
};

