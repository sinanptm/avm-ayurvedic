import ITokenService from "../../../domain/interface/services/ITokenService";
import NotificationUseCase from "../../../use_case/notification/NotificationUseCae";
import { Namespace, Server, Socket } from "socket.io";
import logger from "../../../utils/logger";
import { TokenPayload, UserRole } from "../../../types";

export default class NotificationSocketManager {
    private io: Namespace
    constructor(
        io: Server,
        private notificationUseCase: NotificationUseCase,
        private tokenService: ITokenService
    ) {
        this.io = io.of("/notification");
        this.initializeNotificationNamespace()
        this.io.use((socket, next) => {
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


    private initializeNotificationNamespace() {
        this.io.on("connection", (socket) => {
            const user = socket.data.user as TokenPayload;

            logger.info(`User ${user.email} connected to /notification`);

            this.handleEvents(socket);

            socket.on("disconnect", (reason) => {
                logger.info(`User ${user.email} disconnected: ${reason}`);
            });

        });
    }

    private handleEvents(socket:Socket){
        
    }
}