'use client'
import NewChatModal, { ChatModelUser } from "@/components/models/chat/AddChatModel";
import ChatList from "@/components/page-components/chat/ChatList"
import { toast } from "@/components/ui/use-toast";
import { useGetDoctorsList } from "@/lib/hooks/appointment/useAppointmentDoctor";
import { useCreateChatPatient, useGetPatientChats } from "@/lib/hooks/chat/useChatPatient";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const { data } = useGetDoctorsList();
  const { mutate: createChat } = useCreateChatPatient();
  const {data:chats,isLoading} = useGetPatientChats()
  const [isNewChatModalOpen, setNewChatModalOpen] = useState(false)
  const router = useRouter();
  const doctors: ChatModelUser[] = data?.items.map(({ _id, image, name }) => ({ _id, name, profilePicture: image })) || [];

  

  const handleSelectChat = (id: string) => {
    router.push(`/chats/${id}`);
  }

  const handleCloseModal = () => {
    setNewChatModalOpen(false)
  }

  const handleAddDoctor = (doctorId: string) => {
    createChat({ doctorId }, {
      onSuccess: ({ chatId }) => {
        router.push(`/chats/${chatId}`)
        setNewChatModalOpen(false)
      },
      onError: ({ response }) => {
        toast({
          title: "Creating new Chat Failed ❌",
          description: response?.data.message || "Unknown Error Occurred 🚑",
          variant: "destructive"
        })
      }
    })

  }

  return (
    <>
      <ChatList
        chats={chats}
        isDoctorData={false}
        isLoading={isLoading}
        onSelectChat={handleSelectChat}
        onNewChat={() => setNewChatModalOpen(true)}
      />
      {doctors && (
        <NewChatModal
          isOpen={isNewChatModalOpen}
          onClose={handleCloseModal}
          users={doctors}
          onSelectUser={handleAddDoctor}
        />
      )}
    </>
  )
}
export default Page

