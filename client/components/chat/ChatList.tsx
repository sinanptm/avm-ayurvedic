'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { IChat } from "@/types"  

interface ChatListProps {
  chats: IChat[]
  onSelectChat: (id: string) => void
  onNewChat: () => void
}

export default function ChatList({ chats, onSelectChat, onNewChat }: ChatListProps) {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-4 border-b">
        <Button className="w-full" variant="outline" onClick={onNewChat}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </div>
      <ScrollArea className="flex-grow">
        <div className="space-y-1 p-1">
          {chats.map(({ _id, doctorName, patientName, doctorProfile, patientProfile, notSeenMessages }) => (
            <div
              key={_id}
              className={`flex items-center space-x-2 p-2 rounded-lg transition-colors cursor-pointer hover:bg-accent/50`}
              onClick={() => onSelectChat(_id!)}
            >
              <Avatar className="w-10 h-10 flex-shrink-0">
                <AvatarImage src={ "/assets/icons/circle-user.svg" } alt={doctorName || patientName} />
                <AvatarFallback>{(doctorName || patientName)?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium text-sm truncate">{doctorName || patientName}</h3>
                  {notSeenMessages && <span className="text-xs text-muted-foreground">{notSeenMessages} new</span>}
                </div>
                <p className="text-xs text-muted-foreground truncate">Tap to chat</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
