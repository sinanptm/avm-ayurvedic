import doctorAxiosInstance from "../api/doctor/authorizedRoutes";
import patientAxiosInstance from "../api/patient/authorizedRoutes";

const refreshToken = async (role: 'patient' | 'doctor'): Promise<string> => {
    try {
        let newToken;
        if (role === 'doctor') {
            const refreshResponse = await doctorAxiosInstance.get('/auth/refresh');
            newToken = refreshResponse.data.accessToken;
        } else {
            const refreshResponse = await patientAxiosInstance.get('/auth/refresh');
            newToken = refreshResponse.data.accessToken;
        }
        return newToken;
    } catch (error) {
        throw new Error('Failed to refresh token');
    }
};

export default refreshToken;