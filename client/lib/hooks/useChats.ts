import { IChat, IPatient } from "@/types/entities";
import { useCallback, useEffect, useRef, useState } from "react";
import connectSocketIO from "../socket.io/connectSocketIO";
import { Socket } from "socket.io-client";
import { CustomError } from "@/types";
import { useAuth } from "./useAuth";
import refreshToken from "../socket.io/refreshToken";
import { useRouter } from "next/navigation";

type Props = {
    role: "patient" | "doctor";
    messagePath: string;
};

const useChats = ({ role, messagePath }: Props) => {
    const socketRef = useRef<Socket | null>(null);
    const [chats, setChats] = useState<IChat[]>([]);
    const [patients, setPatients] = useState<IPatient[]>([]);
    const [error, setError] = useState<CustomError | null>(null);
    const { setCredentials } = useAuth();
    const router = useRouter();

    const connectSocket = useCallback(() => {
        if (socketRef.current) return;

        const socket = connectSocketIO({ role, namespace: "chat" });
        socketRef.current = socket;

        socket.emit("getChats");

        socket.on("chats", (chats) => {
            setChats(chats);
        });

        socket.on("connect", () => {
            socket.emit("getChats");
        });

        socket.on("connect_error", () => {
            setError({ message: "Connection failed. Reconnecting..." });
        });

        socket.on("joinedRoom", (chatId) => {
            socket.emit("getChats");
            router.push(`${messagePath}/${chatId}`);
        });

        socket.on("patients", (patients) => {
            setPatients(patients);
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
                } catch (err) {
                    console.error("Failed to refresh token", err);
                    setError({ message: "Failed to refresh token" });
                }
            } else {
                setError({ message: error.message, statusCode: error.statusCode });
            }
        });

        socket.on("reconnect", () => {
            setError(null);
            socket.emit("getChats");
        });

    }, [role, messagePath, setCredentials, router]);

    const joinChatRoom = (chatId: string) => {
        if (socketRef.current && socketRef.current.connected) {
            socketRef.current.emit("joinRoom", chatId.toString());
        } else {
            connectSocket();  
            socketRef.current?.once("connect", () => {
                socketRef.current?.emit("joinRoom", chatId.toString());
            });
        }
    }

    const createChat = (receiverId: string) => {
        if (socketRef.current) {
            socketRef.current.emit("createChat", receiverId);
        }
    }

    const getPatients = () => {
        if (socketRef.current) {
            socketRef.current.emit("getPatients");
        }
    }

    useEffect(() => {
        connectSocket();

        return () => {
            if (socketRef.current) {
                socketRef.current.off("getChats");
                socketRef.current.off("chats");
                socketRef.current.off("error");
                socketRef.current.off("joinedRoom");
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [connectSocket]);

    return {
        chats,
        error,
        patients,
        joinChatRoom,
        createChat,
        getPatients,
    };
};

export default useChats;
