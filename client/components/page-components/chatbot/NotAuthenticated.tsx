import { ButtonV2 } from "@/components/button/ButtonV2"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LogIn, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface NotAuthenticatedProps {
  onClose: () => void;
}

const NotAuthenticated: React.FC<NotAuthenticatedProps> = ({ onClose }) => {
    return (
        <Card className="h-full sm:h-[600px] max-h-[800px] justify-center flex flex-col shadow-2xl border-primary/10 bg-dark-200 rounded-2xl overflow-hidden relative">
            <ButtonV2
                onClick={onClose}
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 h-10 w-10 rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-700 transition-colors"
                aria-label="Close"
            >
                <Image
                    src='/assets/icons/x.svg'
                    width={20}
                    height={20}
                    alt="Close"
                    className="h-5 w-5"
                />
            </ButtonV2>
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">😑 Authentication Required</CardTitle>
                <CardDescription>Please log in to access your messages</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
                <LogIn className="h-24 w-24 text-primary" />
            </CardContent>
            <CardFooter className="flex justify-center">
                <ButtonV2 asChild variant="expandIcon" Icon={LogIn} iconPlacement="right">
                    <Link href="/signin">
                        Sign in
                    </Link>
                </ButtonV2>
            </CardFooter>
        </Card>
    )
}

export default NotAuthenticated