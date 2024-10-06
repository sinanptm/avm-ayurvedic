import { CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"
import Image from "next/image"
import ChatBotCardHeader from "./ChatBotCardHeader"
import { IChatBotMessage } from "@/types/entities"
import { useEffect, useRef } from "react"

type Props = {
  handleClose: () => void;
  messages?: IChatBotMessage[];
}

const MessageDisplay = ({ handleClose, messages }: Props) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'auto' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <CardContent className="flex-grow p-0">
        <ChatBotCardHeader handleClose={handleClose} />
        <ScrollArea className="h-[calc(100vh-16rem)] sm:h-[460px] w-full p-6" ref={scrollAreaRef}>
          {messages && messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex mb-6 ${!msg.isBotMessage ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end space-x-3 ${!msg.isBotMessage ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${!msg.isBotMessage ? 'bg-green-600' : 'bg-gray-600'}`}>
                  {
                    !msg.isBotMessage
                      ? <Image
                        src={'/assets/icons/circle-user.svg'}
                        width={23}
                        height={23}
                        alt='User'
                        className="h-5 w-5 text-white"
                      /> :
                      <Image
                        src={'/assets/icons/utils/robot.svg'}
                        width={23}
                        height={23}
                        alt='Robot'
                        className="h-5 w-5 text-white"
                      />
                  }
                </div>
                <i
                  className={`max-w-[75%] p-4 rounded-2xl shadow-md ${msg.isBotMessage ? 'bg-green-600 text-white' : 'bg-gray-700 text-white'}`}
                >
                  <p className="text-sm">{msg.message}</p>
                </i>
              </div>
            </motion.div>
          ))}
          <div ref={bottomRef}></div>
        </ScrollArea>
      </CardContent>
    </>
  )
}

export default MessageDisplay
