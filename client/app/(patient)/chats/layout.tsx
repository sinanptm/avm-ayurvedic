import ChatLayout from "@/components/page-components/chat/ChatLayout";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
   title: "Chat",
   description: "Chat with your doctor, manage your chats seamlessly with AVM Ayurvedic",
   keywords: [
      "chat",
      "messages",
      "AVM Ayurvedic",
      "healthcare",
      "doctor",
      "patient",
      "chat with doctor",
      "chat with patient",
   ],
};
const layout = ({ chatList, chat }: { chatList: ReactNode; chat: ReactNode }) => {
   return <ChatLayout chat={chat} chatList={chatList} isPatient={true} />;
};

export default layout;
