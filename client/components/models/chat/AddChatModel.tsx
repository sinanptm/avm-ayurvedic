import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export interface ChatModelUser {
   _id?: string;
   name?: string;
   profilePicture?: string;
}

interface NewChatModalProps {
   isOpen: boolean;
   onClose: () => void;
   users: ChatModelUser[];
   onSelectUser: (userId: string) => void;
}

export default function NewChatModal({ isOpen, onClose, users, onSelectUser }: NewChatModalProps) {
   return (
      <Dialog open={isOpen} onOpenChange={onClose}>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Start a New Chat</DialogTitle>
            </DialogHeader>
            <ScrollArea className="mt-4 max-h-[60vh]">
               <div className="space-y-4">
                  {users.map((user) => (
                     <Button
                        key={user._id}
                        variant="outline"
                        className="w-full justify-start text-left"
                        onClick={() => onSelectUser(user._id!)}
                     >
                        <Avatar className="w-10 h-10 mr-4">
                           <AvatarImage src={user.profilePicture || "/assets/icons/circle-user.svg"} alt={user.name} />
                           <AvatarFallback>{user.name!.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                     </Button>
                  ))}
               </div>
            </ScrollArea>
         </DialogContent>
      </Dialog>
   );
}
