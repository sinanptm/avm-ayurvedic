import { Namespace, Server, Socket } from "socket.io";
import NotificationUseCase from "../../../use_case/notification/NotificationUseCae";
import ITokenService from "../../../domain/interface/services/ITokenService";
import NotificationSocketEvents from "../../events/NotificationSocketEvents";

export default class NotificationSocketManager {
    private io: Namespace;
    private notificationSocketEvents: NotificationSocketEvents;

    constructor(
        io: Server,
        private notificationUseCase: NotificationUseCase,
        private tokenService: ITokenService
    ) {
        this.io = io.of("/notification");
        this.notificationSocketEvents = new NotificationSocketEvents(this.io, notificationUseCase);
        this.setupMiddleware();
        this.initializeNotificationNamespace();
    }

    private setupMiddleware() {
        this.io.use((socket, next) => {
            const token = socket.handshake.auth.token;

            if (!token) {
                return next(new Error("Authentication error"));
            }

            try {
                socket.data.user = this.tokenService.verifyAccessToken(token);
                next();
            } catch (error: any) {
                return next(new Error("Invalid token"));
            }
        });
    }

    private initializeNotificationNamespace() {
        this.io.on("connection", (socket: Socket) => {
            socket.on('authenticate', ({ token }) => {
                try {
                    const user = this.tokenService.verifyAccessToken(token);
                    socket.data.user = user;
                } catch (err) {
                    socket.disconnect();
                }
            });

            if (socket.data.user) {
                this.notificationSocketEvents.initializeEvents(socket);
            } else {
                socket.emit("error", "User is not authenticated");
                socket.disconnect();
            }
        });
    }
}
