"use client"

import { useRef, useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, AlertCircle, Smile } from "lucide-react"
import { IChat, IMessage } from "@/types"
import { useRouter } from "next/navigation"
import { Spinner } from "@/components/skeletons/spinner"
import { getReceiverData, getSenderData } from "./getUserData"
import dynamic from 'next/dynamic'
import { EmojiClickData, Theme } from 'emoji-picker-react'
import { ButtonV2 } from "@/components/common/ButtonV2"
import Messages from "./Messages"
import { useQueryClient } from "@tanstack/react-query"

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
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const query = useQueryClient();

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message)
      setMessage("")
      setShowEmojiPicker(false)
      query.invalidateQueries({ queryKey: ['messages', chat._id] })
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
  }, [])

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
    <div className="flex flex-col h-full bg-black">
      <header className="p-4 border-b border-gray-800 flex-shrink-0 bg-black">
        <div className="flex items-center space-x-4">
          <ButtonV2 variant="ghost" size="icon" onClick={() => router.back()} className="sm:hidden">
            <ArrowLeft className="h-6 w-6 text-white" />
            <span className="sr-only">Back to chat list</span>
          </ButtonV2>
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={getSenderData(sender, chat.doctorProfile!, chat.patientProfile!) || `/assets/icons/circle-user.svg`}
              alt={`${getSenderData(sender, chat.doctorName!, chat.patientName!)}`}
            />
            <AvatarFallback>{sender.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold text-white">{getSenderData(sender, chat.doctorName!, chat.patientName!)}</h2>
            <p className="text-sm text-gray-400">{sender.charAt(0).toUpperCase() + sender.slice(1)}</p>
          </div>
        </div>
      </header>
      <Messages messages={messages} sender={sender} chat={chat} />
      <footer className="border-t border-gray-800 p-4 flex-shrink-0 bg-black">
        <div className="flex items-center gap-2">
          <Input
            className="flex-1 bg-gray-800 text-white border-gray-700"
            placeholder={`Message ${getReceiverData(sender, chat.doctorName!, chat.patientName!)}`}
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
              <Smile className="h-5 w-5 text-white" />
            </ButtonV2>
            {showEmojiPicker && (
              <div className="absolute bottom-full right-0 mb-2 z-10" ref={emojiPickerRef}>
                <EmojiPicker theme={Theme.DARK} onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>
          <ButtonV2
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            <Send className="h-4 w-4 mr-2" />
            Send
          </ButtonV2>
        </div>
      </footer>
    </div>
  )
}