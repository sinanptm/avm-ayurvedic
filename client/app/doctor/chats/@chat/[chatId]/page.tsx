'use client'
import ChatSection from "@/components/page-components/chat/ChatSection"
import { toast } from "@/components/ui/use-toast"
import useMessages from "@/lib/hooks/useMessages"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const Page = () => {
  const chatId = useParams().chatId as string;
  const [isLoading, setLoading] = useState(true);
  const { createMessage, error, messages, chat } = useMessages({ role: "doctor", chatId });

  useEffect(() => {
    if (chat && messages) {
      setLoading(false);
    }
  }, [messages, chat])

  const handleSendMessage = async (newMessage: string) => {
    createMessage(chatId, newMessage, chat?.doctorId!)
    if (error) {
      toast({
        title: `Message sending failed ${error.statusCode && `with ${error.statusCode}`}`,
        description: error.message || "Unknown error Occurred",
        variant: "destructive"
      })
    }

  }  
  return (
    <ChatSection
      sender={"patient"}
      isLoading={isLoading}
      isPending={false}
      messages={messages}
      isError={!!error}
      chat={chat!}
      error={error?.message}
      onSendMessage={handleSendMessage}
    />
  );
}

export default Page;
