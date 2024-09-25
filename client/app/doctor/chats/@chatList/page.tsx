'use client'
import NewChatModal, { ChatModelUser } from "@/components/models/chat/AddChatModel";
import ChatList from "@/components/page-components/chat/ChatList"
import { toast } from "@/components/ui/use-toast";
import { useGetPatientsDoctor, useCreateChatDoctor,  useGetDoctorChats } from "@/lib/hooks/chat/useChatDoctor";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const { data } = useGetPatientsDoctor();
  const { mutate: createChat } = useCreateChatDoctor();
  const { data: chats, isLoading, refetch } = useGetDoctorChats()
  const [isNewChatModalOpen, setNewChatModalOpen] = useState(false)
  const router = useRouter();
  const patients: ChatModelUser[] = data?.map(({ _id, profile, name }) => ({ _id, name, profilePicture: profile })) || [];

  const handleSelectChat = (id: string) => {
    router.push(`/doctor/chats/${id}`);
  }

  

  const handleCloseModal = () => {
    setNewChatModalOpen(false)
  }

  const handleAddDoctorChat = (patientId: string) => {
    createChat({ patientId }, {
      onSuccess: () => {
        refetch();
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
        chats={chats!}
        sender="patient"
        skeltonCount={19}
        isLoading={isLoading}
        onSelectChat={handleSelectChat}
        onNewChat={() => setNewChatModalOpen(true)}
      />
      {patients && (
        <NewChatModal
          isOpen={isNewChatModalOpen}
          onClose={handleCloseModal}
          users={patients}
          onSelectUser={handleAddDoctorChat}
        />
      )}
    </>
  )
}
export default Page

