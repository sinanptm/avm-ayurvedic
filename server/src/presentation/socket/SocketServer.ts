import { Server, Socket } from "socket.io";
import { Server as HTTPServer } from "http";
import { CLIENT_URL } from "../../config/env";
import logger from "../../utils/logger";
import ITokenService from "../../domain/interface/services/ITokenService";
import { UserRole } from "../../types";

export default class SocketServer {
    private io: Server;
    private tokenService: ITokenService;

    constructor(server: HTTPServer, tokenService: ITokenService) {
        this.io = new Server(server, {
            cors: {
                origin: CLIENT_URL,
                methods: ["GET", "POST"],
                credentials: true,
            },
        });
        this.tokenService = tokenService;

        this.initializeMiddlewares();
        this.handleErrors();
    }

    private initializeMiddlewares() {
        this.io.use((socket, next) => {
            const token = socket.handshake.auth.token;
            try {
                const { role, id, email } = this.tokenService.verifyAccessToken(token);
                socket.data.role = role;
                socket.data.id = id;
                socket.data.email = email;

                next();
            } catch (error: any) {
                logger.error(`Authentication error: ${error.message}`);
                next(new Error("Authentication error"));
            }
        });
    }

    private handleErrors() {
        this.io.on("error", (error) => {
            logger.error(`Socket.IO error: ${error.message}`);
            this.io.emit("error", error);
        });
    }

    public getUserData(socket: Socket) {
        return {
            role: socket.data.role as UserRole,
            id: socket.data.id as string,
            email: socket.data.email as string,
        }
    }

    public getIO(): Server {
        return this.io;
    }

}
