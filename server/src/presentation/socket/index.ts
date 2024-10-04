import { Server as HTTPServer } from "http";
import NotificationRepository from "../../infrastructure/repositories/NotificationRepository";
import VideoSectionRepository from "../../infrastructure/repositories/VideoSectionRepository";
import AppointmentRepository from "../../infrastructure/repositories/AppointmentRepository";
import UpdateAppointmentUseCase from "../../use_case/appointment/UpdateAppointmentUseCase";
import MessageRepository from "../../infrastructure/repositories/MessageRepository";
import PatientRepository from "../../infrastructure/repositories/PatientRepository";
import DoctorRepository from "../../infrastructure/repositories/DoctorRepository";
import ChatRepository from "../../infrastructure/repositories/ChatRepository";
import CreateChatUseCase from "../../use_case/chat/CreateChatUseCase";
import JoiService from "../../infrastructure/services/JoiService";
import JWTService from "../../infrastructure/services/JWTService";
import GetChatUseCase from "../../use_case/chat/GetChatUseCase";
import VideoSocketManager from "./video/VideoSocketManager";
import ChatSocketManager from "./chat/ChatSocketManager";
import SocketServer from "./SocketServer/SocketServer";

const tokenService = new JWTService();
const validationService = new JoiService();

const appointmentRepository = new AppointmentRepository();
const videoRepository = new VideoSectionRepository();
const notificationRepository = new NotificationRepository();
const patientRepository = new PatientRepository();
const messageRepository = new MessageRepository();
const chatRepository = new ChatRepository();
const doctorRepository = new DoctorRepository()

const updateAppointmentUseCase = new UpdateAppointmentUseCase(
    appointmentRepository, validationService, notificationRepository, videoRepository
);
const createChatUseCase = new CreateChatUseCase(
    messageRepository, chatRepository, validationService, patientRepository, doctorRepository
);
const getChatUseCase = new GetChatUseCase(
    messageRepository, chatRepository, validationService, patientRepository
)

export function initializeSocketIO(server: HTTPServer) {
    const socketServer = new SocketServer(server);

    new VideoSocketManager(socketServer.getIO(), updateAppointmentUseCase, tokenService);
    new ChatSocketManager(socketServer.getIO(), tokenService, createChatUseCase, getChatUseCase);
}
