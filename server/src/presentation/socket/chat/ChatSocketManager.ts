import { Server, Socket, Namespace } from "socket.io";
import ITokenService from "../../../domain/interface/services/ITokenService";
import CreateChatUseCase from "../../../use_case/chat/CreateChatUseCase";
import GetChatUseCase from "../../../use_case/chat/GetChatUseCase";
import logger from "../../../utils/logger";
import { TokenPayload } from "../../../types";

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
            const user = socket.data.user as TokenPayload;
           
        });
    }

  
}
