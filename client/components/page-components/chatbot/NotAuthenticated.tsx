import { ButtonV2 } from "@/components/button/ButtonV2"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LogIn } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { memo } from "react";

interface NotAuthenticatedProps {
  onClose: () => void;
}

const NotAuthenticated: React.FC<NotAuthenticatedProps> = ({ onClose }) => {
    return (
        <Card className="h-[80vh] sm:h-[600px] flex flex-col justify-between shadow-2xl border-primary/10 bg-dark-200 rounded-t-2xl sm:rounded-2xl overflow-hidden">
            <CardHeader className="relative pt-8 pb-4 px-4 sm:px-6 text-center">
                <ButtonV2
                    onClick={onClose}
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-700 transition-colors"
                    aria-label="Close"
                >
                    <Image
                        src='/assets/icons/x.svg'
                        width={16}
                        height={16}
                        alt="Close"
                        className="h-4 w-4"
                    />
                </ButtonV2>
                <CardTitle className="text-lg sm:text-xl font-bold mb-2">Authentication Required</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Please log in to access your messages</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex items-center justify-center p-4">
                <div className="bg-green-600/20 rounded-full p-4 sm:p-6">
                    <LogIn className="h-12 w-12 sm:h-16 sm:w-16 text-green-500" />
                </div>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
                <ButtonV2 asChild variant="expandIcon" Icon={LogIn} iconPlacement="right" className="w-full sm:w-auto text-sm">
                    <Link href="/signin">
                        Sign in to Continue
                    </Link>
                </ButtonV2>
            </CardFooter>
        </Card>
    )
}

export default memo(NotAuthenticated)