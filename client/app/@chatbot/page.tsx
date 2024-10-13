import Chatbot from "@/components/page-components/chatbot/ChatBotButton";
import { Metadata } from "next";

export const metadata: Metadata = {
   keywords: [
      "chat bot",
      "open ai",
      "AI chatbot",
      "virtual assistant",
      "chat",
      "messages",
      "AVM Ayurvedic",
      "healthcare",
   ],
   description: "Integrating an OpenAI chatbot into the application to enhance user experience",
};

const page = () => {
   return <Chatbot />;
};

export default page;
