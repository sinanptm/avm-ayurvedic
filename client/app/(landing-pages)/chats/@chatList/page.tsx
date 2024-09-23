'use client'

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface Contact {
  id: number
  name: string
  lastMessage: string
  avatar: string
  lastSeen: string
}

export default function ChatList() {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const router = useRouter()

  const contacts: Contact[] = [
    { id: 1, name: "Alice Johnson", lastMessage: "Hey, how are you?", avatar: "/assets/icons/circle-user.svg", lastSeen: "2m" },
    { id: 2, name: "Bob Smith", lastMessage: "Let's catch up later.", avatar: "/assets/icons/circle-user.svg", lastSeen: "1h" },
    { id: 3, name: "Charlie Brown", lastMessage: "Got the files?", avatar: "/assets/icons/circle-user.svg", lastSeen: "3h" },
    { id: 4, name: "Diana Prince", lastMessage: "Meeting at 3 PM", avatar: "/assets/icons/circle-user.svg", lastSeen: "5h" },
    { id: 5, name: "Ethan Hunt", lastMessage: "Mission accomplished!", avatar: "/assets/icons/circle-user.svg", lastSeen: "1d" },
  ]

  const handleChatSelect = (id: number) => {
    setSelectedId(id)
    router.push(`/chats/${id}`)
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-4 border-b">
        <Button className="w-full" variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </div>
      <ScrollArea className="flex-grow">
        <div className="space-y-1 p-1">
          {contacts.map(({ id, name, lastMessage, avatar, lastSeen }) => (
            <div
              key={id}
              className={`flex items-center space-x-2 p-2 rounded-lg transition-colors cursor-pointer ${
                selectedId === id ? 'bg-accent' : 'hover:bg-accent/50'
              }`}
              onClick={() => handleChatSelect(id)}
            >
              <Avatar className="w-10 h-10 flex-shrink-0">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-medium text-sm truncate">{name}</h3>
                  <span className="text-xs text-muted-foreground">{lastSeen}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}