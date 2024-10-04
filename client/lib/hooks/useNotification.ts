import { useCallback, useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import connectSocketIO from "../socket.io/connectSocketIO";
import { INotification } from "@/types/entities";

type Props = {
    role: "patient" | "doctor";
};

const useNotification = ({ role }: Props) => {
    const socketRef = useRef<Socket | null>(null);
    const [notifications, setNotifications] = useState<INotification[]>([]);
    const [error, setError] = useState<string | null>(null);

    const connectSocket = useCallback(() => {
        if (socketRef.current) {
            socketRef.current.disconnect();
        }

        const socket = connectSocketIO({ role, namespace: "notification" });
        socketRef.current = socket;

        socket.emit("getNotifications");

        socket.on("notifications", (notifications: INotification[]) => {
            setNotifications(notifications);
        });

        socket.on("notificationCleared", (notificationId: string) => {
            setNotifications((prev) =>
                prev.filter((notification) => notification._id !== notificationId)
            );
        });

        socket.on("notificationsCleared", (notificationIds: string[]) => {
            setNotifications((prev) =>
                prev.filter((notification) => !notificationIds.includes(notification._id!))
            );
        });

        socket.on("error", (err: string) => {
            setError(err);
        });

        socket.on("connect_error", () => {
            setError("Connection failed. Reconnecting...");
        });

        socket.on("reconnect", () => {
            setError(null); 
            socket.emit("getNotifications");
        });
    }, [role]);

    const clearNotification = useCallback((notificationId: string) => {
        if (socketRef.current) {
            socketRef.current.emit("clearNotification", notificationId);
        }
    }, []);

    const clearAllNotifications = useCallback((notificationIds: string[]) => {
        if (socketRef.current) {
            socketRef.current.emit("clearAllNotifications", notificationIds);
        }
    }, []);

    useEffect(() => {
        connectSocket();

        return () => {
            if (socketRef.current) {
                socketRef.current.off("notifications");
                socketRef.current.off("notificationCleared");
                socketRef.current.off("notificationsCleared");
                socketRef.current.off("error");
                socketRef.current.disconnect();
            }
        };
    }, [connectSocket]);

    return {
        notifications,
        error,
        clearNotification,
        clearAllNotifications
    };
};

export default useNotification;
