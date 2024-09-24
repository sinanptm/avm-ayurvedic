'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusCircle } from "lucide-react"
import { IChat } from "@/types"
import { getSenderData } from './getSenderData'
import ChatListSkeleton from "@/components/skeletons/ChatList"
import { ButtonV2 } from "@/components/common/ButtonV2"

interface ChatListProps {
  chats: IChat[];
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
  isLoading: boolean;
  sender: "doctor" | "patient";
  skeltonCount:number
}

export default function ChatList({ chats, onSelectChat, onNewChat, isLoading, sender, skeltonCount }: ChatListProps) {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-3 border-b space-y-3">
        <ButtonV2 className="w-full" variant="ringHover" size="sm" onClick={onNewChat}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Chat
        </ButtonV2>
      </div>
      <ScrollArea className="flex-grow">
        <div className="space-y-1 p-2">
          {isLoading ? (
            <ChatListSkeleton itemCount={skeltonCount} />
          ) : (
            chats.map(({ _id, doctorName, patientName, doctorProfile, patientProfile, notSeenMessages }, i) => (
              <div
                key={`${_id},${i}`}
                className="flex items-center space-x-2 p-2 rounded-lg transition-colors cursor-pointer hover:bg-accent/50 border border-border"
                onClick={() => onSelectChat(_id!)}
              >
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src={getSenderData(sender, doctorProfile!, patientProfile!) || "/assets/icons/circle-user.svg"} alt={getSenderData(sender, doctorName!, patientName!)} />
                  <AvatarFallback>{getSenderData(sender, doctorName!, patientName!)?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-medium text-sm truncate">{getSenderData(sender, doctorName!, patientName!)}</h3>
                    {notSeenMessages! > 0 && (
                      <span className="bg-primary text-primary-foreground text-xs font-medium px-1.5 py-0.5 rounded-full">
                        {notSeenMessages}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
      {!isLoading && chats.length === 0 && (
        <div className="p-4 text-center text-muted-foreground text-sm">
          No chats found
        </div>
      )}
    </div>
  )
}