import { Server, Socket, Namespace } from "socket.io";
import UpdateAppointmentUseCase from "../../../use_case/appointment/UpdateAppointmentUseCase";
import ITokenService from "../../../domain/interface/services/ITokenService";
import logger from "../../../utils/logger";

export default class VideoSocketManager {
    private io: Namespace;

    constructor(
        io: Server,
        private updateAppointmentUseCase: UpdateAppointmentUseCase,
        private tokenService: ITokenService
    ) {
        this.io = io.of("/video");
        this.initializeVideoNamespace();
        this.io.use((socket: Socket, next) => {
            const token = socket.handshake.auth.token;

            if (!token) {
                logger.warn(`Socket ${socket.id} attempted connection without token`);
                return next(new Error("Authentication error"));
            }

            try {
                socket.data.user = this.tokenService.verifyAccessToken(token);
                next();
            } catch (error: any) {
                logger.error(`Invalid token for socket ${socket.id}: ${error.message}`);
                return next(new Error("Invalid token"));
            }
        });
    }

    private initializeVideoNamespace() {
        this.io.on("connection", (socket: Socket) => {

            socket.on("join-room", async (roomId: string) => {
                if (roomId) {
                    if (socket.data.user.role === 'doctor') {
                        await this.updateAppointmentUseCase.updateCompleteSection(roomId, socket.data.user.id!);
                    }
                    socket.join(roomId);
                } else {
                    logger.warn(`Socket ${socket.id} attempted to join a room without a roomId`);
                    socket.emit("error", { message: "Room ID is required to join the room" });
                }
            });

            socket.on("signal", (signalData: any, roomId: string) => {
                try {
                    if (signalData && roomId) {
                        socket.to(roomId).emit("signal", signalData);
                    } else {
                        logger.warn(`Invalid signal data or roomId from socket ${socket.id}`);
                    }
                } catch (error: any) {
                    logger.error(`Error handling signal from socket ${socket.id}: ${error.message}`);
                    socket.emit("error", { message: `Error handling signal from socket ${socket.id}: ${error.message}` });
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
        this.io.to(roomId).emit("leave-room", { userId: socketId });
    }

    private handleUserDisconnection(socket: Socket) {
        const rooms = Array.from(socket.rooms).filter(room => room !== socket.id);
        rooms.forEach((roomId) => {
            socket.leave(roomId);
            this.notifyRoomAboutLeaving(roomId, socket.id);
        });
    }
}
