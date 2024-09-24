'use client'
import ChatSection from "@/components/page-components/chat/ChatSection"
import { useGetPatientMessages } from "@/lib/hooks/chat/useChatPatient"
import { useParams } from "next/navigation"

const Page = () => {
  const chatId = useParams().chatId as string;
  const { data:messages, isError, error, isLoading } = useGetPatientMessages(chatId, 10)

  const handleSendMessage = (newMessage: string) => {
    console.log("New message sent:", newMessage);
  }  
  
  return (
    <ChatSection
      chatId={chatId}
      isDoctor={false}
      isLoading={isLoading}
      messages={messages?.items!}
      isError={isError}
      error={error?.response?.data.message}
      onSendMessage={handleSendMessage}
    />
  );
}

export default Page;
