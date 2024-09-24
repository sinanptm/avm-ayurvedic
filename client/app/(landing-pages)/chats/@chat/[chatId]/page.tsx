'use client'
import ChatSection from "@/components/page-components/chat/ChatSection"
import { toast } from "@/components/ui/use-toast"
import { useCreateMessagePatient, useGetPatientMessages } from "@/lib/hooks/chat/useChatPatient"
import { useAuth } from "@/lib/hooks/useAuth";
import { useParams } from "next/navigation"
import { useState } from "react"

const Page = () => {
  const chatId = useParams().chatId as string;
  const [limit,setLimit] = useState(40)
  const { data: response, isError, error, isLoading, refetch } = useGetPatientMessages(chatId, limit);
  const { mutate: createMessage, isPending } = useCreateMessagePatient()
  const { patientToken } = useAuth()
  const isAuthorized = !!patientToken
  const handleSendMessage = (newMessage: string) => {
    if (!isAuthorized) {
      toast({
        title: "Unauthorized ❌",
        description: "You are not authorized to access this feature.",
        variant: "destructive"
      });
      return;
    }
    createMessage({ doctorId: response?.chat.doctorId!, chatId, message: newMessage }, {
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
      sender={"doctor"}
      isAuthorized={isAuthorized}
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
