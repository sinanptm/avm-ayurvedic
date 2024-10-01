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

            socket.on("signal", (signalData: any, roomId: string) => {
                try {
                    if (signalData && roomId) {
                        socket.to(roomId).emit("signal", signalData);
                        logger.info(`Signal relayed to room ${roomId} from socket ${socket.id}`);
                    } else {
                        logger.warn(`Invalid signal data or roomId from socket ${socket.id}`);
                    }
                } catch (error: any) {
                    logger.error(`Error handling signal from socket ${socket.id}: ${error.message}`);
                }
            });

            socket.on("disconnect", () => {
                this.handleUserDisconnection(socket);
            });

            socket.on("leave-room", (roomId: string) => {
                if (roomId) {
                    socket.leave(roomId);
                    this.notifyRoomAboutLeaving(roomId, socket.id);
                    logger.info(`Socket ${socket.id} left room ${roomId}`);
                } else {
                    logger.warn(`Socket ${socket.id} attempted to leave a room without a roomId`);
                }
            });
        });
    }

    private notifyRoomAboutLeaving(roomId: string, socketId: string) {
        this.io.to(roomId).emit("user-left", { userId: socketId });
    }

    private handleUserDisconnection(socket: Socket) {
        const rooms = Array.from(socket.rooms).filter(room => room !== socket.id);
        rooms.forEach((roomId) => {
            socket.leave(roomId);
            this.notifyRoomAboutLeaving(roomId, socket.id);
            logger.info(`Socket ${socket.id} disconnected and left room ${roomId}`);
        });
    }
}
