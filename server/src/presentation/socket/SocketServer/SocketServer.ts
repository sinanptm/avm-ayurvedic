import { Server } from "socket.io";
import { Server as HTTPServer } from "http";
import { CLIENT_URL } from "../../../config/env";
import logger from "../../../utils/logger";

export default class SocketServer {
    private io: Server;

    constructor(server: HTTPServer ) {
        this.io = new Server(server, {
            cors: {
                origin: CLIENT_URL,
                methods: ["GET", "POST"],
                credentials: true,
            },
        });
        this.handleErrors();
    }


    private handleErrors() {
        this.io.on("error", (error) => {
            logger.error(`Socket.IO error: ${error.message}`);
            this.io.emit("error", error);
        });
    }

    public getIO(): Server {
        return this.io;
    }

}
