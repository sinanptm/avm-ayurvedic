import { Namespace, Server, Socket } from "socket.io";
import NotificationUseCase from "../../../use_case/notification/NotificationUseCae";
import ITokenService from "../../../domain/interface/services/ITokenService";
import CustomError from "../../../domain/entities/CustomError";
import { TokenPayload, UserRole } from "../../../types";
import logger from "../../../utils/logger";

export default class NotificationSocketManager {
    private io: Namespace;

    constructor(
        io: Server,
        private notificationUseCase: NotificationUseCase,
        private tokenService: ITokenService
    ) {
        this.io = io.of("/notification");
        this.setupMiddleware();
        this.initializeNotificationNamespace();
    }

    private setupMiddleware() {
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
        this.io.on("connection", (socket: Socket) => {
            const user = socket.data.user as TokenPayload;
            logger.info(`User ${user.email} connected to /notification`);

            this.initializeEvents(socket);

            socket.on("disconnect", (reason) => {
                logger.info(`User ${user.email} disconnected: ${reason}`);
            });
        });
    }

    private initializeEvents(socket: Socket) {
        socket.on("getNotifications",
            async () => this.handleErrors(socket, this.getNotifications(socket))
        );
        socket.on("clearNotification",
            async (notificationId: string) => this.handleErrors(socket, this.clearOne(socket, notificationId))
        );
        socket.on("clearAllNotifications",
            async (notificationIds: string[]) => this.handleErrors(socket, this.clearAll(socket, notificationIds))
        );
    }

    private async getNotifications(socket: Socket) {
        const user = socket.data.user as TokenPayload;
        let notifications;
        if (user.role === UserRole.Patient) {
            notifications = await this.notificationUseCase.getAllPatient(user.id);
        } else if (user.role === UserRole.Doctor) {
            notifications = await this.notificationUseCase.getAllDoctor(user.id);
        }
        socket.emit("notifications", notifications);
    }

    private async clearOne(socket: Socket, notificationId: string) {
        await this.notificationUseCase.clearOn(notificationId);
        socket.emit("notificationCleared", notificationId);
    }

    private async clearAll(socket: Socket, notificationIds: string[]) {
        await this.notificationUseCase.clearAll(notificationIds);
        socket.emit("notificationsCleared", notificationIds);
    }

    private async handleErrors(socket: Socket, handler: Promise<void>) {
        try {
            await handler;
        } catch (error) {
            if (error instanceof CustomError) {
                socket.emit("error", error.message);
            } else {
                socket.emit("error", "An unexpected error occurred");
                logger.error(error);
            }
        }
    }
}
