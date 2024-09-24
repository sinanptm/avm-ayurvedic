'use client'
import ChatList from "@/components/page-components/chat/ChatList"
import { IChat } from "@/types"
import { useRouter } from "next/navigation";

const Page = () => {
  const chats: IChat[] = chatData;
  const router = useRouter()

  const handleSelectChat = (id: string) => {
    router.push(`/chats/${id}`)
  }

  const handleNewChat = () => {
    console.log("New Chat")
  }

  return (
    <ChatList
      chats={chats} 
      isDoctor={false}
      onSelectChat={handleSelectChat} 
      onNewChat={handleNewChat} 
    />
  )
}
export default Page


var chatData: IChat[] = [
  {
    _id: "1",
    doctorId: "101",
    patientId: "201",
    doctorProfile: "/assets/icons/doctor-profile-1.svg",
    patientProfile: "/assets/icons/circle-user.svg",
    doctorName: "Dr. Alice Johnson",
    patientName: "John Doe",
    notSeenMessages: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "2",
    doctorId: "102",
    patientId: "202",
    doctorProfile: "/assets/icons/circle-user.svg",
    patientProfile: "/assets/icons/patient-profile-2.svg",
    doctorName: "Dr. Bob Smith",
    patientName: "Jane Smith",
    notSeenMessages: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "3",
    doctorId: "103",
    patientId: "203",
    doctorProfile: "/assets/icons/doctor-profile-3.svg",
    patientProfile: "/assets/icons/circle-user.svg",
    doctorName: "Dr. Charlie Brown",
    patientName: "Charlie Brown Jr.",
    notSeenMessages: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "4",
    doctorId: "104",
    patientId: "204",
    doctorProfile: "/assets/icons/doctor-profile-4.svg",
    patientProfile: "/assets/icons/circle-user.svg",
    doctorName: "Dr. Diana Prince",
    patientName: "Bruce Wayne",
    notSeenMessages: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: "5",
    doctorId: "105",
    patientId: "205",
    doctorProfile: "/assets/icons/doctor-profile-5.svg",
    patientProfile: "/assets/icons/circle-user.svg",
    doctorName: "Dr. Ethan Hunt",
    patientName: "Clark Kent",
    notSeenMessages: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
]