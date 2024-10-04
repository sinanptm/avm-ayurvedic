import { Server, Socket, Namespace } from "socket.io";
import logger from "../../utils/logger";
import ITokenService from "../../domain/interface/services/ITokenService";
import CreateChatUseCase from "../../use_case/chat/CreateChatUseCase";
import GetChatUseCase from "../../use_case/chat/GetChatUseCase";

export default class ChatSocketManager {
    private io: Namespace;

    constructor(
        io: Server,
        private tokenService: ITokenService,
        private createChatUseCase: CreateChatUseCase,
        private getChatUseCase: GetChatUseCase
    ) {
        this.io = io.of("/chat");
        this.initializeChatNamespace();
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
                logger.error(`Invalid token for socket ${socket.id}: ${error.message}, status: ${error.statusCode}`);
                return next(new Error("Invalid token"));
            }
        });
    }

    private initializeChatNamespace() {
        this.io.on("connection", (socket: Socket) => {
            
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
