'use client';

import { useState, useEffect, memo, useCallback } from 'react';
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import ChatBotController from './ChatBotController';
import MessageDisplay from './MessageDisplay';
import NotAuthenticated from './NotAuthenticated';
import { IChatBotMessage } from '@/types/entities';
import { useCreateMessage, useGetMessage } from '@/lib/hooks/chatbot/useChatBot';
import { toast } from '@/components/ui/use-toast';
import { getRandomId } from '@/lib/utils';

type Props = {
    isVisible: boolean;
    setIsOpen: (value: boolean) => void;
    isAuthenticated: boolean;
};

const ChatSection = ({ isVisible, setIsOpen, isAuthenticated }: Props) => {
    const { data, isLoading } = useGetMessage();
    const [messages, setMessages] = useState<IChatBotMessage[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const { mutate: createMessage, isPending } = useCreateMessage();
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (data && data?.length > 0) {
            setMessages(data);
        }
    }, [data]);

    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);

    const sendMessage = useCallback(() => {
        if (inputMessage.trim()) {
            const id = getRandomId();
            const tempMessage: IChatBotMessage = {
                isBotMessage: false,
                message: inputMessage,
                _id: id,
                patientId: id
            };
            setMessages(prev => [...prev, tempMessage]);
            setInputMessage("");
            setIsTyping(true);

            createMessage({ message: inputMessage },
                {
                    onSuccess: (newMessage) => {
                        setIsTyping(false);
                        setMessages(prev => [...prev, newMessage]);
                    },
                    onError: (error) => {
                        setIsTyping(false);
                        toast({
                            title: "Error Occurred while sending message",
                            variant: "destructive",
                            description: error.response?.data.message || "Unknown error Occurred"
                        });
                        setInputMessage(tempMessage.message!);
                    }
                }
            );
        }
    }, [inputMessage, setInputMessage, setIsTyping, createMessage]);

    return (
        <AnimatePresence onExitComplete={() => setIsOpen(false)}>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, bounce: 0.50 }}
                    className="fixed inset-x-0 bottom-0 sm:inset-auto sm:right-6 sm:bottom-6 sm:w-[400px] md:w-[450px] lg:w-[500px] h-[80vh] sm:h-[600px] max-h-[800px] z-50"
                >
                    {isAuthenticated ? (
                        <Card className="h-full flex flex-col shadow-2xl border-primary/10 bg-dark-200 rounded-t-2xl sm:rounded-2xl overflow-hidden">
                            <MessageDisplay
                                isLoading={isLoading}
                                messages={messages}
                                handleClose={handleClose}
                                isTyping={isTyping}
                            />
                            <ChatBotController
                                inputMessage={inputMessage}
                                setInputMessage={setInputMessage}
                                sendMessage={sendMessage}
                                isSending={isPending}
                            />
                        </Card>
                    ) : (
                        <NotAuthenticated onClose={handleClose} />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default memo(ChatSection);