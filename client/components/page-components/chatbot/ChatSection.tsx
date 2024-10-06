'use client'

import { useState, useEffect, useRef } from 'react'
import { Card } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import ChatBotController from './ChatBotController'
import MessageDisplay from './MessageDisplay'

type Message = {
    text: string;
    isUser: boolean
}

type Props = {
    isVisible: boolean;
    setIsOpen: (value: boolean) => void;
}

const ChatSection = ({ isVisible, setIsOpen }: Props) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
        }
    }, [messages])

    const handleClose = () => {
        setIsOpen(false)
    }

    const sendMessage = () => {
        if (inputMessage.trim()) {
            setMessages([...messages, { text: inputMessage, isUser: true }])
            setInputMessage('')
            setTimeout(() => {
                setMessages(prev => [...prev, { text: "Thank you for your message. How can I assist you with AVM Ayurvedic services today?", isUser: false }])
            }, 1000)
        }
    }

    return (
        <AnimatePresence
            onExitComplete={() => setIsOpen(false)}
        >
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="fixed inset-2 sm:inset-auto sm:right-6 sm:bottom-6 sm:w-[400px] md:w-[450px] lg:w-[500px] max-h-[calc(100vh-2rem)] z-50"
                >
                    <Card className="h-full sm:h-[600px] max-h-[800px] flex flex-col shadow-2xl border-primary/10 bg-dark-200 rounded-2xl overflow-hidden">
                        <MessageDisplay messages={messages} scrollAreaRef={scrollAreaRef} handleClose={handleClose} />
                        <ChatBotController
                            inputMessage={inputMessage}
                            setInputMessage={setInputMessage}
                            sendMessage={sendMessage}
                        />
                    </Card>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ChatSection
