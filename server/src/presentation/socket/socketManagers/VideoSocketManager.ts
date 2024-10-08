import { Server, Socket, Namespace } from "socket.io";
import UpdateAppointmentUseCase from "../../../use_case/appointment/UpdateAppointmentUseCase";
import ITokenService from "../../../domain/interface/services/ITokenService";
import VideoSocketEvents from "../events/VideoSocketEvents";
import logger from "../../../utils/logger";

export default class VideoSocketManager {
    private io: Namespace;
    private videoSocketEvents: VideoSocketEvents;

    constructor(
        io: Server,
        private updateAppointmentUseCase: UpdateAppointmentUseCase,
        private tokenService: ITokenService
    ) {
        this.io = io.of("/video");
        this.videoSocketEvents = new VideoSocketEvents(this.io, updateAppointmentUseCase);
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
            this.videoSocketEvents.initializeEvents(socket);
        });
    }
}
