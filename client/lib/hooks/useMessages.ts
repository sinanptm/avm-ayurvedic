import { useCallback, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import { IChat, IMessage } from "@/types/entities";
import { CustomError } from "@/types";
import connectSocketIO from "../socket.io/connectSocketIO";
import { useAuth } from "./useAuth";
import refreshToken from "../socket.io/refreshToken";
import { useRouter } from "next/navigation";

type Props = {
   role: "patient" | "doctor";
   chatId: string;
};

const useMessages = ({ role, chatId }: Props) => {
   const socketRef = useRef<Socket | null>(null);
   const [messages, setMessages] = useState<IMessage[] | []>([]);
   const [chat, setChat] = useState<IChat>();
   const [error, setError] = useState<CustomError | null>();
   const { setCredentials } = useAuth();
   const router = useRouter();

   const connectSocket = useCallback(() => {
      if (socketRef.current) return;

      const socket = connectSocketIO({ role, namespace: "chat" });
      socketRef.current = socket;

      socket.emit("joinRoom", chatId);
      socket.emit("getMessages", chatId);

      socket.on("messages", (messages) => {
         setMessages(messages);
      });

      socket.on("received", ({ chatId: updatedChat }) => {
         if (chatId === updatedChat) {
            setMessages((prevMessages) =>
               prevMessages.map((message) => ({
                  ...message,
                  isReceived: true,
               }))
            );
         }
      });
      socket.on("chat", (chat) => {
         setChat(chat);
      });

      socket.on("disconnect", () => {
         socket.emit("joinRoom", chatId);
      });

      socket.on("newMessage", (newMessage) => {
         socket.emit("getChats");
         setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      socket.on("connect_error", () => {
         setError({ message: "Connection failed. Reconnecting..." });
      });

      socket.on("error", async (error) => {
         if (error.message === "Invalid token" || error.statusCode === 401) {
            try {
               const refreshedToken = await refreshToken(role);
               role === "doctor"
                  ? setCredentials("doctorToken", refreshedToken)
                  : setCredentials("patientToken", refreshedToken);
               socket.emit("authenticate", { token: refreshedToken });
               setError(null);
               router.refresh();
            } catch (err) {
               console.error("Failed to refresh token", err);
               setError({ message: "Failed to refresh token" });
            }
         } else {
            setError({ message: error.message, statusCode: error.statusCode });
            console.log(error);
         }
      });
   }, [role, chatId, setCredentials, router]);

   const createMessage = useCallback((chatId: string, message: string, receiverId: string) => {
      if (socketRef.current) {
         socketRef.current.emit("createMessage", { message, chatId, receiverId });
      }
   }, []);

   const markReceived = (chatId: string, receiverId: string) => {
      if (socketRef.current) {
         socketRef.current.emit("markReceived", { chatId, receiverId });
      }
   };

   useEffect(() => {
      connectSocket();
      return () => {
         if (socketRef.current) {
            socketRef.current.off("newMessage");
            socketRef.current.off("error");
            socketRef.current.off("getMessages");
            socketRef.current.off("messages");
            socketRef.current.off("createMessage");
            socketRef.current.off("markReceived");
            socketRef.current.off("received");
            socketRef.current.off("getChats");
            socketRef.current.disconnect();
            socketRef.current = null;
         }
      };
   }, [connectSocket]);

   return {
      messages,
      error,
      chat,
      createMessage,
      markReceived,
   };
};

export default useMessages;
