'use client'

import { useState, useEffect, useRef } from 'react'
import { Card } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import ChatBotController from './ChatBotController'
import MessageDisplay from './MessageDisplay'
import NotAuthenticated from './NotAuthenticated'
import { IChatBotMessage } from '@/types/entities'
import { useCreateMessage } from '@/lib/hooks/chatbot/useChatBot'
import { useGetMessage } from '@/lib/hooks/chatbot/useChatBot'
import { toast } from '@/components/ui/use-toast'

type Props = {
    isVisible: boolean;
    setIsOpen: (value: boolean) => void;
    isAuthenticated: boolean;
}

const ChatSection = ({ isVisible, setIsOpen, isAuthenticated }: Props) => {
    const { data, isLoading } = useGetMessage()
    const [messages, setMessages] = useState<IChatBotMessage[]>(data ?? []);
    const [inputMessage, setInputMessage] = useState('');
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const { mutate: createMessage, isPending } = useCreateMessage();

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [messages]);

    const handleClose = () => {
        setIsOpen(false);
    }

    const sendMessage = () => {
        if (inputMessage.trim()) {
            createMessage({ message: inputMessage },
                {
                    onSuccess: (messages) => {
                        setMessages(prev => [...prev, ...messages]);
                    },
                    onError: (error) => {
                        toast({
                            title: "Error Occurred while sending message",
                            variant: "destructive",
                            description: error.response?.data.message || "Unknown error Occurred"
                        })
                    }
                }
            )
        }
    }

    return (
        <AnimatePresence onExitComplete={() => setIsOpen(false)}>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, bounce: 0.50 }}
                    className="fixed inset-2 sm:inset-auto sm:right-6 sm:bottom-6 sm:w-[400px] md:w-[450px] lg:w-[500px] max-h-[calc(100vh-2rem)] z-50"
                >
                    {isAuthenticated ? (
                        <Card className="h-full sm:h-[600px] max-h-[800px] flex flex-col shadow-2xl border-primary/10 bg-dark-200 rounded-2xl overflow-hidden">
                            <MessageDisplay scrollAreaRef={scrollAreaRef} handleClose={handleClose} />
                            <ChatBotController
                                inputMessage={inputMessage}
                                setInputMessage={setInputMessage}
                                sendMessage={sendMessage}
                            />
                        </Card>
                    ) : (
                        <NotAuthenticated />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ChatSection;
