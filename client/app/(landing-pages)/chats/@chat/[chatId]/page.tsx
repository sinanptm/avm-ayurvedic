'use client'
import ChatSection from "@/components/chat/ChatSection"
import { IMessage } from "@/types"
import { useParams } from "next/navigation"

const Page = () => {
  const { chatId } = useParams()

  const handleSendMessage = (newMessage: string) => {
    console.log("New message sent:", newMessage)
  }

  const handleBack = () => {
    console.log("Navigating back to chat list")
  }

  return (
    <ChatSection
      chatId={chatId as string}
      messages={messages}
      onSendMessage={handleSendMessage}
      onBack={handleBack}
    />
  )
}

export default Page


var messages: IMessage[] = [
  { _id: "1", chatId: "101", senderId: "201", receiverId: "101", message: "Hello, how are you?", isReceived: true, createdAt: new Date() },
  { _id: "2", chatId: "101", senderId: "101", receiverId: "201", message: "I'm fine, thanks for asking!", isReceived: false, createdAt: new Date() },
]