'use client';

import { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import ChatSection from './ChatSection'
import { ButtonV2 } from '@/components/button/ButtonV2';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const path = usePathname();
    const { patientToken } = useAuth()

    if (
        !!!patientToken ||
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
        <div className="fixed bottom-4 right-4 z-50">
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
                            className="rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-600 shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            aria-label="Open chat"
                        >
                            <Image
                                src={'/assets/icons/utils/robot.svg'}
                                width={23}
                                height={23}
                                alt='Robot'
                                className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 fill-white"
                            />
                        </ButtonV2>
                    </motion.div>
                )}
            </AnimatePresence>
            <ChatSection isVisible={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
}

export default Chatbot
