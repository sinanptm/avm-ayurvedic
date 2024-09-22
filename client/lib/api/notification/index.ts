import { withTempBaseUrl } from "@/lib/utils/withTempBaseUrl";
import patientAxiosInstance from "../patient/authorizedRoutes";
import doctorAxiosInstance from "../doctor/authorizedRoutes";

const patientBaseUrl = `${process.env.NEXT_PUBLIC_API_URL}/notifications/patient`;
const doctorBaseUrl = `${process.env.NEXT_PUBLIC_API_URL}/notifications/doctor`;

// Patient
export const getPatientNotifications = async()=>{
    const response = await withTempBaseUrl(patientAxiosInstance,patientBaseUrl,{
        method:"GET",
        url:"/"
    })
    return response.data;
}

export const clearMultiplePatientNotifications = async(notificationIds:string[])=>{
    const response = await  withTempBaseUrl(patientAxiosInstance,patientBaseUrl,{
        method:"DELETE",
        url:"/clear-all",
        data:{
            notificationIds
        }
    })
    return response.data;
}

export const clearPatientNotification = async(notificationId:string)=>{
    const response = await  withTempBaseUrl(patientAxiosInstance,patientBaseUrl,{
        method:"DELETE",
        url:`/${notificationId}`,
    });
    return response.data;
}


// Doctor
export const getDoctorNotifications = async()=>{
    const response = await withTempBaseUrl(doctorAxiosInstance,doctorBaseUrl,{
        method:"GET",
        url:"/"
    })
    return response.data;
}

export const clearMultipleDoctorNotifications = async(notificationIds:string[])=>{
    const response = await  withTempBaseUrl(doctorAxiosInstance,doctorBaseUrl,{
        method:"DELETE",
        url:"/clear-all",
        data:{
            notificationIds
        }
    })
    return response.data;
}

export const clearDoctorNotification = async(notificationId:string)=>{
    const response = await  withTempBaseUrl(doctorAxiosInstance,doctorBaseUrl,{
        method:"DELETE",
        url:`/${notificationId}`,
    });
    return response.data;
}