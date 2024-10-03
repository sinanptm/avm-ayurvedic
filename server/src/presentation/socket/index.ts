import { Server as HTTPServer } from "http";
import SocketServer from "./SocketServer";
import VideoSocketManager from "./VideoSocketManager";
import JWTService from "../../infrastructure/services/JWTService";
import UpdateAppointmentUseCase from "../../use_case/appointment/UpdateAppointmentUseCase";
import JoiService from "../../infrastructure/services/JoiService";
import AppointmentRepository from "../../infrastructure/repositories/AppointmentRepository";
import VideoSectionRepository from "../../infrastructure/repositories/VideoSectionRepository";
import NotificationRepository from "../../infrastructure/repositories/NotificationRepository";

const tokenService = new JWTService();
const validationService = new JoiService();

const appointmentRepository = new AppointmentRepository();
const videoRepository = new VideoSectionRepository();
const notificationRepository = new NotificationRepository()

export function initializeSocketIO(server: HTTPServer) {
    const socketServer = new SocketServer(server);

    const updateAppointmentUseCase = new UpdateAppointmentUseCase(
        appointmentRepository, validationService, notificationRepository, videoRepository
    );
    new VideoSocketManager(socketServer.getIO(), updateAppointmentUseCase, tokenService);
}
