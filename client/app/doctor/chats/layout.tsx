import ChatLayout from "@/components/page-components/chat/ChatLayout"
import { Metadata } from "next";
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: 'Chat',
  description: 'Chat with your patients, manage your chats seamlessly with AVM Ayurvedic',
  keywords: ['chat', 'messages', 'AVM Ayurvedic', 'healthcare', 'doctor', 'patient'],
};
const layout = ({ chatList, chat }: { chatList: ReactNode; chat: ReactNode }) => {
  return <ChatLayout chat={chat} chatList={chatList} isPatient={false} />
}

export default layout