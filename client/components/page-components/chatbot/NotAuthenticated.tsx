import { ButtonV2 } from "@/components/button/ButtonV2"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LogIn } from "lucide-react"
import Link from "next/link"

const NotAuthenticated = () => {
    return (
        <Card className="h-full sm:h-[600px] max-h-[800px] justify-center flex flex-col shadow-2xl border-primary/10 bg-dark-200 rounded-2xl overflow-hidden">
            <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Authentication Required</CardTitle>
                <CardDescription>Please log in to access your messages</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
                <LogIn className="h-24 w-24 text-primary" />
            </CardContent>
            <CardFooter className="flex justify-center">
                <ButtonV2 asChild variant="expandIcon" Icon={LogIn} iconPlacement="right">
                    <Link href="/signin">
                        signin
                    </Link>
                </ButtonV2>
            </CardFooter>
        </Card>
    )
}

export default NotAuthenticated