import { Server as HTTPServer } from "http";
import NotificationSocketManager from "./socketManagers/NotificationSocketManager";
import VideoSocketManager from "./socketManagers/VideoSocketManager";
import ChatSocketManager from "./socketManagers/ChatSocketManager";
import SocketServer from "./SocketServer";
import createUseCase from "../../di/useCases";
import { jwtService } from "../../di/services";

const { updateAppointmentUseCase, getChatUseCase, createChatUseCase, notificationUseCase } = createUseCase;


const initializeSocketIO = (server: HTTPServer) => {
    const socketServer = new SocketServer(server);
    const io = socketServer.getIO();
    new VideoSocketManager(io, updateAppointmentUseCase, jwtService);
    new ChatSocketManager(io, jwtService, createChatUseCase, getChatUseCase);
    new NotificationSocketManager(io, notificationUseCase, jwtService);
};

export default initializeSocketIO;