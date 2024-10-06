export const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const apiUrls = {
    NOTIFICATION: `${baseUrl}/notifications`,
    PRESCRIPTION: `${baseUrl}/prescription`,
    APPOINTMENT: `${baseUrl}/appointments`,
    BASE_URL: baseUrl?.split("/api")[0],
    PATIENT: `${baseUrl}/patient`,
    CHATBOT: `${baseUrl}/chatbot`,
    DOCTOR: `${baseUrl}/doctor`,
    ADMIN: `${baseUrl}/admin`,
    VIDEO: `${baseUrl}/video`,
    SLOT: `${baseUrl}/slots`,
    CHAT: `${baseUrl}/chats`,
}

export default apiUrls