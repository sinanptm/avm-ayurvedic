"use client";

import { useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { IChat, IMessage } from "@/types/entities";
import { getReceiverData, getSenderData } from "./getUserData";

interface ChatSectionProps {
   sender: "doctor" | "patient";
   messages: IMessage[];
   chat: IChat;
}

export default function Messages({ messages, sender, chat }: ChatSectionProps) {
   const scrollAreaRef = useRef<HTMLDivElement>(null);
   const bottomRef = useRef<HTMLDivElement>(null);

   const scrollToBottom = () => {
      bottomRef.current?.scrollIntoView({ behavior: "auto" });
   };

   useEffect(() => {
      scrollToBottom();
   }, [messages]);

   return (
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
         <div className="space-y-4">
            {messages.map(({ _id, message, senderId, createdAt, isReceived }, i) => {
               const isSenderMessage = senderId === (sender === "patient" ? chat.patientId : chat.doctorId);
               if (isSenderMessage) {
                  return (
                     <div key={_id} className="flex items-end space-x-2 justify-start">
                        <Avatar className="w-8 h-8 ring-2 ring-blue-600">
                           <AvatarImage
                              src={
                                 getSenderData(sender, chat.doctorProfile!, chat.patientProfile!) ||
                                 `/assets/icons/circle-user.svg`
                              }
                              alt="sender"
                           />
                           <AvatarFallback>
                              {getSenderData(sender, chat.doctorName!, chat.patientName!).charAt(0)}
                           </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start max-w-[70%]">
                           <div className="bg-blue-600 text-white rounded-2xl rounded-tl-sm p-3 shadow-md">
                              <p className="text-sm">{message}</p>
                           </div>
                           <span className="text-xs text-gray-400 mt-1">{format(new Date(createdAt!), "hh:mm a")}</span>
                        </div>
                     </div>
                  );
               } else {
                  return (
                     <div key={_id} className="flex items-end space-x-2 justify-end">
                        <div className="flex flex-col items-end max-w-[70%]">
                           <div className="bg-gray-200 text-gray-900 rounded-2xl rounded-br-sm p-3 shadow-md">
                              <p className="text-sm">{message}</p>
                           </div>
                           <span className="text-xs text-gray-400 mt-1">
                              {format(new Date(createdAt!), "hh:mm a")} {isReceived && "✔️"}
                           </span>
                        </div>
                        <Avatar className="w-8 h-8 ring-2 ring-gray-300">
                           <AvatarImage
                              src={
                                 getReceiverData(sender, chat.doctorProfile!, chat.patientProfile!) ||
                                 `/assets/icons/circle-user.svg`
                              }
                              alt="receiver"
                           />
                           <AvatarFallback>
                              {getReceiverData(sender, chat.doctorName!, chat.patientName!).charAt(0)}
                           </AvatarFallback>
                        </Avatar>
                     </div>
                  );
               }
            })}
            <div ref={bottomRef} />
         </div>
      </ScrollArea>
   );
}
