import { Socket } from "socket.io";
import logger from "../../utils/logger";

const manageVideoSection = (socket:Socket)=>{
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
}


export default manageVideoSection