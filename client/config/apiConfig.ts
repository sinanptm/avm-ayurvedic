export const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const apiUrls = {
    PATIENT:`${baseUrl}/patient`,
    DOCTOR:`${baseUrl}/doctor`,
    ADMIN:`${baseUrl}/admin`,
    SLOT:`${baseUrl}/slots`,
    APPOINTMENT:`${baseUrl}/appointments`,
    NOTIFICATION:`${baseUrl}/notifications`,
    CHAT:`${baseUrl}/chats`,
    VIDEO:`${baseUrl}/video`,
    PRESCRIPTION:`${baseUrl}/prescription`,
    BASE_URL:baseUrl?.split("/api")[0]
}

export default apiUrls