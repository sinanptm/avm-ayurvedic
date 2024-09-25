'use client'
import ChatSection from "@/components/page-components/chat/ChatSection"
import { toast } from "@/components/ui/use-toast"
import { useGetDoctorMessages, useCreateMessageDoctor } from "@/lib/hooks/chat/useChatDoctor"
import { useParams } from "next/navigation"
import { useState } from "react"

const Page = () => {
  const chatId = useParams().chatId as string;
  const [limit, setLimit] = useState(40)
  const { data: response, isError, error, isLoading, refetch } = useGetDoctorMessages(chatId, limit);
  const { mutate: createMessage, isPending } = useCreateMessageDoctor()

  const handleSendMessage = (newMessage: string) => {
    createMessage({ patientId: response?.chat.patientId!, chatId, message: newMessage }, {
      onSuccess: () => {
        refetch();
      },
      onError: ({ response }) => {
        toast({
          title: "Error in sending message ❌",
          description: response?.data.message || "Unknown error Occurred",
          variant: "destructive"
        });
      }
    })
  }

  return (
    <ChatSection
      sender={"patient"}
      isLoading={isLoading}
      isPending={isPending}
      messages={response?.data.items!}
      isError={isError}
      chat={response?.chat!}
      error={error?.response?.data.message}
      onSendMessage={handleSendMessage}
    />
  );
}

export default Page;
