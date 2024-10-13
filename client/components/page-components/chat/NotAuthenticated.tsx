import { ButtonV2 } from "@/components/button/ButtonV2";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default function NotAuthenticated() {
   return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center bg-background p-4">
         <Card className="w-full max-w-md">
            <CardHeader className="text-center">
               <CardTitle className="text-2xl font-bold">Authentication Required</CardTitle>
               <CardDescription>Please log in to access your messages</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
               <LogIn className="h-24 w-24 text-primary" />
            </CardContent>
            <CardFooter className="flex justify-center">
               <ButtonV2 asChild variant="expandIcon" Icon={LogIn} iconPlacement="right">
                  <Link href="/signin">signin</Link>
               </ButtonV2>
            </CardFooter>
         </Card>
      </div>
   );
}
