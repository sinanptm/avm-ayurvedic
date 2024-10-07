'use client';

import { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { ButtonV2 } from '@/components/button/ButtonV2';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import dynamic from 'next/dynamic';

const ChatSection = dynamic(() => import('./ChatSection'), { ssr: false })

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const path = usePathname();
    const { patientToken } = useAuth();

    if (
        path.includes("/chats") ||
        path.includes("/register") ||
        path.includes("/signup") ||
        path.includes("/video-section") ||
        path.includes("/doctor") ||
        path.includes("/admin") ||
        path.includes("signin") ||
        path.includes("opt-verification")
    ) {
        return null;
    }
    return (
        <div className="fixed sm:bottom-4 bottom-10 right-6 sm sm:right-4 z-50">
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                    >
                        <ButtonV2
                            onClick={() => setIsOpen(true)}
                            variant={"ringHover"}
                            className="rounded-full w-16 h-16 md:w-20 md:h-20 bg-green-600 shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            aria-label="Open chat"
                        >
                            <Image
                                src={'/assets/icons/utils/robot.svg'}
                                width={23}
                                height={23}
                                alt='Robot'
                                className="h-6 w-6 md:h-8 md:w-8 fill-white"
                            />
                        </ButtonV2>
                    </motion.div>
                )}
            </AnimatePresence>
            {isOpen &&
                <ChatSection isVisible={isOpen} setIsOpen={setIsOpen} isAuthenticated={!!patientToken} />
            }
        </div>
    )
}

export default Chatbot
