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

            socket.on("join-room", (roomId: string) => {
                if (roomId) {
                    socket.join(roomId);
                    logger.info(`Socket ${socket.id} joined room ${roomId}`);
                } else {
                    logger.warn(`Socket ${socket.id} attempted to join a room without a roomId`);
                }
            });

            socket.on("offer", (offer: RTCSessionDescriptionInit, roomId: string) => {
                try {
                    if (offer && roomId) {
                        this.io.to(roomId).emit("offer", offer);
                    } else {
                        logger.warn(`Invalid offer or roomId received from socket ${socket.id}`);
                    }
                } catch (error:any) {
                    logger.error(`Error handling offer from socket ${socket.id}: ${error.message}`);
                }
            });

            // Handle WebRTC answer signaling
            socket.on("answer", (answer: RTCSessionDescriptionInit, roomId: string) => {
                try {
                    if (answer && roomId) {
                        this.io.to(roomId).emit("answer", answer);
                        logger.info(`Answer sent to room ${roomId} by socket ${socket.id}`);
                    } else {
                        logger.warn(`Invalid answer or roomId received from socket ${socket.id}`);
                    }
                } catch (error:any) {
                    logger.error(`Error handling answer from socket ${socket.id}: ${error.message}`);
                }
            });

            socket.on("ice-candidate", (candidate: RTCIceCandidate, roomId: string) => {
                try {
                    if (candidate && roomId) {
                        this.io.to(roomId).emit("ice-candidate", candidate);
                    } else {
                        logger.warn(`Invalid ICE candidate or roomId received from socket ${socket.id}`);
                    }
                } catch (error:any) {
                    logger.error(`Error handling ICE candidate from socket ${socket.id}: ${error.message}`);
                }
            });

            socket.on("disconnect", () => {
                this.handleUserDisconnection(socket);
            });

            socket.on("leave-room", (roomId: string) => {
                if (roomId) {
                    socket.leave(roomId);
                    this.notifyRoomAboutLeaving(roomId, socket.id);
                } else {
                    logger.warn(`Socket ${socket.id} attempted to leave a room without a roomId`);
                }
            });
        });
    }

    private notifyRoomAboutLeaving(roomId: string, socketId: string) {
        this.io.to(roomId).emit("user-left", { userId: socketId });
    }

    // Handle user disconnection and cleanup
    private handleUserDisconnection(socket: Socket) {
        const rooms = Array.from(socket.rooms).filter(room => room !== socket.id); 
        rooms.forEach((roomId) => {
            socket.leave(roomId);
            this.notifyRoomAboutLeaving(roomId, socket.id);
        });
    }
}
