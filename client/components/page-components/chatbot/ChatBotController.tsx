import { ButtonV2 } from "@/components/button/ButtonV2";
import { Input } from "@/components/ui/input";
import { CardFooter } from "@/components/ui/card";
import { Send } from "lucide-react";
import { memo } from "react";

type ChatBotControllerProps = {
    inputMessage: string;
    setInputMessage: (value: string) => void;
    sendMessage: () => void;
    isSending: boolean;
};

const ChatBotController = ({ inputMessage, setInputMessage, sendMessage, isSending }: ChatBotControllerProps) => {
    return (
        <CardFooter className="pt-2 sm:pt-3 bg-dark-300">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!isSending) sendMessage();
                }}
                className="flex w-full items-center space-x-2 sm:space-x-3"
            >
                <Input
                    type="text"
                    placeholder="Type your message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-grow bg-dark-100 text-white placeholder-gray-400 border-gray-600 focus:border-green-500 focus:ring-green-500 text-xs sm:text-sm py-2 sm:py-3 rounded-full"
                    aria-label="Type your message"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                        }
                    }}
                />
                <ButtonV2
                    type="submit"
                    variant={"ringHover"}
                    size="icon"
                    className="rounded-full bg-green-600 hover:bg-green-700 transition-colors duration-200 h-8 w-8 sm:h-10 sm:w-10"
                    aria-label="Send message"
                    disabled={isSending || inputMessage.trim() === ''}
                >
                    <Send className={`h-4 w-4 sm:h-5 sm:w-5 ${isSending ? 'animate-pulse' : ''}`} />
                </ButtonV2>
            </form>
        </CardFooter>
    );
};

export default memo(ChatBotController);