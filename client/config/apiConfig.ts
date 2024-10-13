export const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const apiUrls = {
   NOTIFICATION: `${baseUrl}/notifications`,
   PRESCRIPTION: `${baseUrl}/prescription`,
   APPOINTMENT: `${baseUrl}/appointments`,
   BASE_URL: process.env.NEXT_PUBLIC_BASE_API_URL!,
   PATIENT: `${baseUrl}/patient`,
   CHATBOT: `${baseUrl}/chatbot`,
   DOCTOR: `${baseUrl}/doctor`,
   ADMIN: `${baseUrl}/admin`,
   VIDEO: `${baseUrl}/video`,
   SLOT: `${baseUrl}/slots`,
   CHAT: `${baseUrl}/chats`,
};

export default apiUrls;
