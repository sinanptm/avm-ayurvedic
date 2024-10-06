'use client'

import { useState, useEffect, useRef, memo } from 'react'
import { Card } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import ChatBotController from './ChatBotController'
import MessageDisplay from './MessageDisplay'
import NotAuthenticated from './NotAuthenticated'
import { IChatBotMessage } from '@/types/entities'
import { useCreateMessage } from '@/lib/hooks/chatbot/useChatBot'
import { useGetMessage } from '@/lib/hooks/chatbot/useChatBot'
import { toast } from '@/components/ui/use-toast'
import { getRandomId } from '@/lib/utils'

type Props = {
    isVisible: boolean;
    setIsOpen: (value: boolean) => void;
    isAuthenticated: boolean;
}

const ChatSection = ({ isVisible, setIsOpen, isAuthenticated }: Props) => {
    const { data } = useGetMessage();
    const [messages, setMessages] = useState<IChatBotMessage[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const { mutate: createMessage, isPending } = useCreateMessage();

    useEffect(() => {
        if (data && data?.length > 0) {
            setMessages(data);
        }
    }, [data]);

    const handleClose = () => {
        setIsOpen(false);
    };    

    const sendMessage = () => {
        if (inputMessage.trim()) {
            const id = getRandomId() 
            const tempMessage: IChatBotMessage = { isBotMessage: false, message: inputMessage, _id:id, patientId:id };
            setMessages(prev => [...prev, tempMessage]);
            createMessage({ message: inputMessage },
                {
                    onSuccess: (newMessages) => {
                        setInputMessage("");
                        setMessages(prev => [...prev, newMessages]);
                    },
                    onError: (error) => {
                        toast({
                            title: "Error Occurred while sending message",
                            variant: "destructive",
                            description: error.response?.data.message || "Unknown error Occurred"
                        });
                    }
                }
            );
        }
    };

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
                            <MessageDisplay messages={messages} handleClose={handleClose} />
                            <ChatBotController
                                inputMessage={inputMessage}
                                setInputMessage={setInputMessage}
                                sendMessage={sendMessage}
                                isSending={isPending}
                            />
                        </Card>
                    ) : (
                        <NotAuthenticated />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default memo(ChatSection);
