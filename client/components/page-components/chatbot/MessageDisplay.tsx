import { CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import ChatBotCardHeader from "./ChatBotCardHeader"
import { IChatBotMessage } from "@/types/entities"
import { useEffect, useRef, useState } from "react"
import ReactMarkdown from 'react-markdown'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  handleClose: () => void;
  messages: IChatBotMessage[];
  isLoading: boolean;
  isMessagePending: boolean;
  isTyping: boolean;
}

const MessageDisplay = ({ handleClose, messages, isLoading, isMessagePending, isTyping }: Props) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [expandedMessages, setExpandedMessages] = useState<Set<string>>(new Set());

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const toggleMessageExpansion = (id: string) => {
    setExpandedMessages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const renderMessage = (msg: IChatBotMessage, index: number) => {
    const messageId = msg._id || `msg-${index}`;
    const isExpanded = expandedMessages.has(messageId);
    const messageContent = msg.message || '';
    const isLongMessage = messageContent.length > 150;

    return (
      <motion.div
        key={messageId}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`flex mb-6 ${!msg.isBotMessage ? 'justify-end' : 'justify-start'}`}
      >
        <div className={`flex items-end space-x-3 ${!msg.isBotMessage ? 'flex-row-reverse space-x-reverse' : ''}`}>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${!msg.isBotMessage ? 'bg-green-600' : 'bg-gray-600'}`}>
            <Image
              src={!msg.isBotMessage ? '/assets/icons/circle-user.svg' : '/assets/icons/utils/robot.svg'}
              width={23}
              height={23}
              alt={!msg.isBotMessage ? 'User' : 'Robot'}
              className="h-5 w-5 text-white"
            />
          </div>
          <div className={`max-w-[75%] p-4 rounded-2xl shadow-md ${msg.isBotMessage ? 'bg-green-600 text-white' : 'bg-gray-700 text-white'}`}>
            <ReactMarkdown className="text-sm">
              {isLongMessage && !isExpanded ? `${messageContent.slice(0, 150)}...` : messageContent}
            </ReactMarkdown>
            {isLongMessage && (
              <button
                onClick={() => toggleMessageExpansion(messageId)}
                className="text-xs mt-2 text-blue-300 hover:text-blue-100 transition-colors"
              >
                {isExpanded ? 'Read less' : 'Read more'}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <>
      <CardContent className="flex-grow p-0">
        <ChatBotCardHeader handleClose={handleClose} />
        <ScrollArea className="h-[calc(100vh-16rem)] sm:h-[460px] w-full p-6" ref={scrollAreaRef}>
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <>
              {messages.map(renderMessage)}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-end mb-6"
                  >
                    <div className="bg-gray-700 p-3 rounded-full">
                      <div className="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
          <div ref={bottomRef}></div>
        </ScrollArea>
      </CardContent>
    </>
  )
}

export default MessageDisplay