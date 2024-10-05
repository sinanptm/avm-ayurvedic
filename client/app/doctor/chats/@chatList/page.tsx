'use client'
import { useEffect, useState } from "react";
import NewChatModal from "@/components/models/chat/AddChatModel";
import ChatList from "@/components/page-components/chat/ChatList"
import useChats from "@/lib/hooks/useChats";

const Page = () => {
  const [isNewChatModalOpen, setNewChatModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(true)
  const { chats, createChat, error, joinChatRoom, patients, getPatients } = useChats({ role: "doctor", messagePath: "/doctor/chats" })

  
  useEffect(() => {
    if (chats && patients) {
      setLoading(false)
    }
  }, [chats, patients]);
  
  const handleJoinChat = (chatId: string) => {
    joinChatRoom(chatId);
  }

  const handleCloseModal = () => {
    setNewChatModalOpen(false);
  }

  const handleAddDoctorChat = (patientId: string) => {
    setNewChatModalOpen(false);
    createChat(patientId);
  }

  const handleClickNewChat = ()=>{
    getPatients();
    setNewChatModalOpen(true);
  }


  return (
    <>
      <ChatList
        chats={chats!}
        sender="patient"
        skeltonCount={19}
        isLoading={isLoading}
        onSelectChat={handleJoinChat}
        onNewChat={handleClickNewChat}
      />
      {patients && (
        <NewChatModal
          isOpen={isNewChatModalOpen}
          onClose={handleCloseModal}
          users={patients.map(({ _id, profile, name }) => ({ _id, name, profilePicture: profile }))}
          onSelectUser={handleAddDoctorChat}
        />
      )}
    </>
  )
}
export default Page


