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
import NotificationSocketManager from "./notification/NotificationSocketManager";
import NotificationUseCase from "../../use_case/notification/NotificationUseCae";

const tokenService = new JWTService();
const validationService = new JoiService();

const appointmentRepository = new AppointmentRepository();
const videoRepository = new VideoSectionRepository();
const notificationRepository = new NotificationRepository();
const patientRepository = new PatientRepository();
const messageRepository = new MessageRepository();
const chatRepository = new ChatRepository();
const doctorRepository = new DoctorRepository();

const updateAppointmentUseCase = new UpdateAppointmentUseCase(
    appointmentRepository, validationService, notificationRepository, videoRepository
);
const createChatUseCase = new CreateChatUseCase(
    messageRepository, chatRepository, validationService, patientRepository, doctorRepository
);
const getChatUseCase = new GetChatUseCase(
    messageRepository, chatRepository, validationService, patientRepository
)
const notificationUseCase = new NotificationUseCase(
    notificationRepository, validationService
)

export function initializeSocketIO(server: HTTPServer) {
    const socketServer = new SocketServer(server);
    const io = socketServer.getIO()
    new VideoSocketManager(io, updateAppointmentUseCase, tokenService);
    new ChatSocketManager(io, tokenService, createChatUseCase, getChatUseCase);
    new NotificationSocketManager(io, notificationUseCase, tokenService)
}
