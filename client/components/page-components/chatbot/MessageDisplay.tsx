'use client'

import { ButtonV2 } from "@/components/button/ButtonV2"
import { CardContent, CardHeader } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"
import Image from "next/image"


type Message = {
  text: string
  isUser: boolean
}

type Props = {
  messages: Message[];
  scrollAreaRef: React.RefObject<HTMLDivElement>;
  handleClose: () => void;
}

const MessageDisplay = ({ messages, scrollAreaRef, handleClose }: Props) => {
  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 py-4 px-6 bg-green-900 text-white">
        <div className="flex items-center space-x-3">
          <Image
            src={'/assets/icons/utils/robot.svg'}
            width={23}
            height={23}
            alt='Robot'
            className="h-7 w-6 text-white"
          />
          <h2 className="text-xl font-semibold">AVM Ayurvedic Assistant</h2>
        </div>
        <ButtonV2
          onClick={handleClose}
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-700 transition-colors"
          aria-label="Close chat"
        >
          <Image
            src={'/assets/icons/x.svg'}
            className="h-5 w-5"
            width={23}
            height={23}
            alt="Close"
          />
        </ButtonV2>
      </CardHeader>
      <CardContent className="flex-grow p-0">

        <ScrollArea className="h-[calc(100vh-16rem)] sm:h-[460px] w-full p-6" ref={scrollAreaRef}>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex mb-6 ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end space-x-3 ${msg.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${msg.isUser ? 'bg-green-600' : 'bg-gray-600'}`}>
                  {
                    msg.isUser
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
                <div
                  className={`max-w-[75%] p-4 rounded-2xl shadow-md ${msg.isUser ? 'bg-green-600 text-white' : 'bg-gray-700 text-white'}`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </ScrollArea>
      </CardContent>
    </>
  )
}

export default MessageDisplay
