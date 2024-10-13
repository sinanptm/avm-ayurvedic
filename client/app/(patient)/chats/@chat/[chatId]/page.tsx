"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ChatSection from "@/components/page-components/chat/ChatSection";
import useMessages from "@/lib/hooks/useMessages";
import { toast } from "@/components/ui/use-toast";

const Page = () => {
   const chatId = useParams().chatId as string;
   const [isLoading, setLoading] = useState(true);
   const { createMessage, error, messages, chat, markReceived } = useMessages({ role: "patient", chatId });

   useEffect(() => {
      if (chat && messages) {
         setLoading(false);
         const filteredMessages = messages.filter((message) => {
            return message.receiverId === chat.patientId && !message.isReceived;
         });

         if (filteredMessages.length > 0) {
            markReceived(chatId, chat.patientId!);
         }
      }
   }, [messages, chat, markReceived, chatId]);

   const handleSendMessage = async (newMessage: string) => {
      createMessage(chatId, newMessage, chat?.doctorId!);
      if (error) {
         toast({
            title: `Message sending failed ${error.statusCode && `with ${error.statusCode}`}`,
            description: error.message || "Unknown error Occurred",
            variant: "destructive",
         });
      }
   };

   return (
      <ChatSection
         sender={"doctor"}
         isLoading={isLoading}
         isPending={false}
         messages={messages}
         isError={!!error}
         chat={chat!}
         error={error?.message}
         onSendMessage={handleSendMessage}
      />
   );
};

export default Page;
