import ChatLayout from "@/components/page-components/chat/ChatLayout"
import { Metadata } from "next";
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: 'Chat',
  description: 'Manage your chats seamlessly with AVM Ayurvedic',
  keywords: 'chat, messages, AVM Ayurvedic, healthcare',
};
const layout = ({ chatList, chat }: { chatList: ReactNode; chat: ReactNode }) => {
  return <ChatLayout chat={chat} chatList={chatList} />
}

export default layout