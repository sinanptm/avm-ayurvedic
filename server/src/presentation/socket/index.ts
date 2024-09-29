import { Server } from "socket.io";
import { Server as HTTPServer } from "http"; 
import { CLIENT_URL } from "../../config/env";
import logger from "../../utils/logger";
import manageVideoSection from "./videoSection";

const initializeSocket = (server: HTTPServer) => {
    const io = new Server(server, {
        cors: {
            origin: CLIENT_URL,
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);
        manageVideoSection(socket);
    });
};

export default initializeSocket;
