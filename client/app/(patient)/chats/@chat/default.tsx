import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function ChatDefault() {
   return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-background to-secondary/20">
         <Card className="w-full max-w-md mx-4">
            <CardContent className="flex flex-col items-center text-center p-6 space-y-4">
               <Image
                  src="/assets/icons/utils/message.svg"
                  alt="Chat Default"
                  width={100}
                  height={100}
                  className="h-16 w-16 text-primary opacity-80"
               />
               <h2 className="text-2xl font-semibold tracking-tight">Welcome to Your Chat</h2>
               <p className="text-muted-foreground">
                  Select an existing conversation from the sidebar or start a new chat to begin messaging.
               </p>
            </CardContent>
         </Card>
      </div>
   );
}
