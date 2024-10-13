"use client";
import NewChatModal, { ChatModelUser } from "@/components/models/chat/AddChatModel";
import ChatList from "@/components/page-components/chat/ChatList";
import { useGetDoctorsList } from "@/lib/hooks/appointment/useAppointmentDoctor";
import useChats from "@/lib/hooks/useChats";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
   const { data } = useGetDoctorsList();
   const [isNewChatModalOpen, setNewChatModalOpen] = useState(false);
   const [isLoading, setLoading] = useState(true);
   const { chats, createChat, error, joinChatRoom } = useChats({ role: "patient", messagePath: "/chats" });
   const [doctors, setDoctors] = useState<ChatModelUser[] | []>([]);
   const router = useRouter();

   useEffect(() => {
      if (chats) {
         setLoading(false);
      }
      setDoctors(data?.items.map(({ _id, image, name }) => ({ _id, name, profilePicture: image })) || []);
   }, [chats, data]);

   const handleCloseModal = () => {
      setNewChatModalOpen(false);
   };

   const handleJoinChat = (chatId: string) => {
      joinChatRoom(chatId);
      setTimeout(() => {
         router.refresh();
      }, 0);
   };

   const handleAddDoctorChat = (doctorId: string) => {
      setNewChatModalOpen(false);
      createChat(doctorId);
   };

   return (
      <>
         <ChatList
            chats={chats!}
            sender="doctor"
            skeltonCount={19}
            isLoading={isLoading}
            onSelectChat={handleJoinChat}
            onNewChat={() => setNewChatModalOpen(true)}
         />
         {doctors && (
            <NewChatModal
               isOpen={isNewChatModalOpen}
               onClose={handleCloseModal}
               users={doctors}
               onSelectUser={handleAddDoctorChat}
            />
         )}
      </>
   );
};
export default Page;
