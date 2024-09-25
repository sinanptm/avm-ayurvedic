"use client"

import { useRef, useEffect, useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, AlertCircle, Smile, LogIn } from "lucide-react"
import { IChat, IMessage } from "@/types"
import { useRouter } from "next/navigation"
import { Spinner } from "@/components/skeletons/spinner"
import { getSenderData } from "./getUserData"
import { format } from "date-fns"
import dynamic from 'next/dynamic'
import { EmojiClickData, Theme } from 'emoji-picker-react'
import { ButtonV2 } from "@/components/common/ButtonV2"

const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false })

interface ChatSectionProps {
  sender: "doctor" | "patient"
  messages: IMessage[]
  onSendMessage: (message: string) => void
  isError: boolean
  isPending: boolean
  isLoading: boolean
  chat: IChat
  error?: string
}

export default function ChatSection({
  messages,
  onSendMessage,
  sender,
  error,
  isError,
  isLoading,
  chat,
  isPending,
}: ChatSectionProps) {
  const [message, setMessage] = useState("")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const router = useRouter()
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const emojiButtonRef = useRef<HTMLButtonElement>(null)
  const emojiPickerRef = useRef<HTMLDivElement>(null)

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
      setShowEmojiPicker(false)
    }
  }

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji)
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiButtonRef.current && 
        !emojiButtonRef.current.contains(event.target as Node) &&
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner className="h-8 w-8 text-primary" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-2">
          <AlertCircle className="h-10 w-10 text-red-500 mx-auto" />
          <p className="text-lg font-semibold">Error loading chat</p>
          <p className="text-sm text-muted-foreground">{error || "An unknown error occurred"}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <header className="p-4 border-b border-border flex-shrink-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center space-x-4">
          <ButtonV2 variant="ghost" size="icon" onClick={() => router.back()} className="sm:hidden">
            <ArrowLeft className="h-6 w-6" />
            <span className="sr-only">Back to chat list</span>
          </ButtonV2>
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={getSenderData(sender, chat.doctorProfile!, chat.patientProfile!) || `/assets/icons/circle-user.svg`}
              alt={`${getSenderData(sender, chat.doctorName!, chat.patientName!)}`}
            />
            <AvatarFallback>{sender[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">{getSenderData(sender, chat.doctorName!, chat.patientName!)}</h2>
            <p className="text-sm text-muted-foreground">{sender === "doctor" ? "Patient" : "Doctor"}</p>
          </div>
        </div>
      </header>
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map(({ _id, message, isReceived, createdAt }) => (
            <div
              key={_id}
              className={`flex items-end gap-2 ${isReceived ? "justify-start" : "justify-end"}`}
            >
              {isReceived && (
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={getSenderData(sender === "doctor" ? "patient" : "doctor", chat.doctorProfile!, chat.patientProfile!) || `/assets/icons/circle-user.svg`}
                    alt={`${getSenderData(sender === "doctor" ? "patient" : "doctor", chat.doctorName!, chat.patientName!)}`}
                  />
                  <AvatarFallback>{(sender === "doctor" ? "P" : "D")}</AvatarFallback>
                </Avatar>
              )}
              <div className={`flex flex-col ${isReceived ? "items-start" : "items-end"} max-w-[70%]`}>
                <div className={`rounded-lg p-3 ${isReceived ? "bg-accent" : "bg-primary text-primary-foreground"}`}>
                  <p className="text-sm">{message}</p>
                </div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span className="text-[10px]">{format(new Date(createdAt!), "HH:mm")}</span>
                  {!isReceived && <span className="text-[10px] ml-1">✔</span>}
                </div>
              </div>
              {!isReceived && (
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={getSenderData(sender, chat.doctorProfile!, chat.patientProfile!) || `/assets/icons/circle-user.svg`}
                    alt={`${getSenderData(sender, chat.doctorName!, chat.patientName!)}`}
                  />
                  <AvatarFallback>{sender[0].toUpperCase()}</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <footer className="border-t border-border p-4 flex-shrink-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-2">
          <Input 
            className="flex-1" 
            placeholder={`Message ${getSenderData(sender, chat.doctorName!, chat.patientName!)}`} 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <div className="relative">
            <ButtonV2 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              ref={emojiButtonRef}
              aria-label="Add emoji"
            >
              <Smile className="h-5 w-5" />
            </ButtonV2>
            {showEmojiPicker && (
              <div className="absolute bottom-full right-0 mb-2 z-10" ref={emojiPickerRef}>
                <EmojiPicker theme={Theme.AUTO} onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>
          <ButtonV2 
            onClick={handleSendMessage} 
            disabled={!message.trim() || isPending}
          >
            <Send className="h-4 w-4 mr-2" />
            Send
          </ButtonV2>
        </div>
      </footer>
    </div>
  )
}