'use client'

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from "next/link"
import { MoreVertical } from "lucide-react"

interface Contact {
  id: number
  name: string
  lastMessage: string
  avatar: string
  lastSeen: string
}

export default function ChatList() {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const contacts: Contact[] = [
    { id: 1, name: "Alice Johnson", lastMessage: "Hey, how are you?", avatar: "/assets/icons/circle-user.svg", lastSeen: "2m" },
    { id: 2, name: "Bob Smith", lastMessage: "Let's catch up later.", avatar: "/assets/icons/circle-user.svg", lastSeen: "1h" },
    { id: 3, name: "Charlie Brown", lastMessage: "Got the files?", avatar: "/assets/icons/circle-user.svg", lastSeen: "3h" },
    { id: 4, name: "Diana Prince", lastMessage: "Meeting at 3 PM", avatar: "/assets/icons/circle-user.svg", lastSeen: "5h" },
    { id: 5, name: "Ethan Hunt", lastMessage: "Mission accomplished!", avatar: "/assets/icons/circle-user.svg", lastSeen: "1d" },
  ]

  return (
    <div className="flex flex-col h-full bg-background">
      <ScrollArea className="flex-grow">
        <div className="space-y-1 p-1">
          {contacts.map(({ id, name, lastMessage, avatar, lastSeen }) => (
            <Link href={`/chats/${id}`} key={id} className="block">
              <div
                className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                  selectedId === id ? 'bg-accent' : 'hover:bg-accent/50'
                }`}
                onClick={() => setSelectedId(id)}
              >
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src={avatar} alt={name} />
                  <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 hidden sm:block">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-medium text-sm truncate">{name}</h3>
                    <span className="text-xs text-muted-foreground">{lastSeen}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{lastMessage}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}