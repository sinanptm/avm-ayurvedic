import { Server, Socket, Namespace } from "socket.io";
import logger from "../../utils/logger";

export default class VideoSocketManager {
    private io: Namespace;
    constructor(io: Server) {
        this.io = io.of("/video");
        this.initializeVideoNamespace();
    }

    private initializeVideoNamespace() {
        this.io.on("connection", (socket: Socket) => {
            logger.info(`User connected to Video namespace: ${socket.id}`);

            // Join a video room
            socket.on("join-room", (roomId) => {
                socket.join(roomId);
                logger.info(`User ${socket.id} joined video room ${roomId}`);
            });

            // Handle WebRTC offer signaling
            socket.on("offer", (offer, roomId) => {
                this.io.to(roomId).emit("offer", offer);
            });

            // Handle WebRTC answer signaling
            socket.on("answer", (answer, roomId) => {
                this.io.to(roomId).emit("answer", answer);
            });

            // Handle ICE candidate signaling
            socket.on("ice-candidate", (candidate, roomId) => {
                this.io.to(roomId).emit("ice-candidate", candidate);
            });

            // Handle video disconnection
            socket.on("disconnect", () => {
                logger.warn(`User disconnected from Video namespace: ${socket.id}`);
            });
        });
    }
}
