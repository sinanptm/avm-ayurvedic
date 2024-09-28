import { Server } from "socket.io";
import { Server as HTTPServer } from "http"; // Type from the HTTP server
import { CLIENT_URL } from "../../config/env";
import logger from "../../utils/logger";

const initializeSocket = (server: HTTPServer) => {
    const io = new Server(server, {
        cors: {
            origin: CLIENT_URL,
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    // Listen for new connections
    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        // Handle joining a room
        socket.on("join-room", (roomId) => {
            socket.join(roomId);
            logger.info(`User ${socket.id} joined room ${roomId}`);
        });

        // Handle offering WebRTC signal (from one client to another)
        socket.on("offer", (offer, roomId) => {
            socket.to(roomId).emit("offer", offer);
        });

        // Handle answering WebRTC offer
        socket.on("answer", (answer, roomId) => {
            socket.to(roomId).emit("answer", answer);
        });

        // Handle ICE candidates for WebRTC
        socket.on("ice-candidate", (candidate, roomId) => {
            socket.to(roomId).emit("ice-candidate", candidate);
        });

        // Handle disconnection
        socket.on("disconnect", () => {
            logger.warn(`User disconnected: ${socket.id}`);
        });
    });
};

export default initializeSocket;
