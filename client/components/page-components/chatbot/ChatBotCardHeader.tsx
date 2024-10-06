import { ButtonV2 } from "@/components/button/ButtonV2"
import { CardHeader } from "@/components/ui/card"
import Image from "next/image"


const ChatBotCardHeader = ({handleClose}:{handleClose: () => void}) => {
    return (
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
    )
}

export default ChatBotCardHeader