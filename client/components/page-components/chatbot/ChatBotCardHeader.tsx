import { ButtonV2 } from "@/components/button/ButtonV2"
import { CardHeader } from "@/components/ui/card"
import Image from "next/image"
import { memo } from "react";

const ChatBotCardHeader = ({ handleClose }: { handleClose: () => void }) => {
    return (
        <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3 sm:py-4 px-4 sm:px-6 bg-green-900 text-white">
            <div className="flex items-center space-x-2 sm:space-x-3">
                <Image
                    src={'/assets/icons/utils/robot.svg'}
                    width={20}
                    height={20}
                    alt='Robot'
                    className="h-5 w-5 sm:h-6 sm:w-6 text-white"
                />
                <h2 className="text-lg sm:text-xl font-semibold">Ayurvedic Assistant</h2>
            </div>
            <ButtonV2
                onClick={handleClose}
                variant="ghost"
                size="icon"
                className="h-8 w-8 sm:h-10 sm:w-10 rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-700 transition-colors"
                aria-label="Close chat"
            >
                <Image
                    src={'/assets/icons/x.svg'}
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    width={20}
                    height={20}
                    alt="Close"
                />
            </ButtonV2>
        </CardHeader>
    )
}

export default memo(ChatBotCardHeader);