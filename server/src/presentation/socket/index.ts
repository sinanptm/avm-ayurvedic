import { Server as HTTPServer } from "http";
import NotificationRepository from "../../infrastructure/repositories/NotificationRepository";
import VideoSectionRepository from "../../infrastructure/repositories/VideoSectionRepository";
import AppointmentRepository from "../../infrastructure/repositories/AppointmentRepository";
import UpdateAppointmentUseCase from "../../use_case/appointment/UpdateAppointmentUseCase";
import MessageRepository from "../../infrastructure/repositories/MessageRepository";
import PatientRepository from "../../infrastructure/repositories/PatientRepository";
import NotificationSocketManager from "./socketManagers/NotificationSocketManager";
import DoctorRepository from "../../infrastructure/repositories/DoctorRepository";
import NotificationUseCase from "../../use_case/notification/NotificationUseCase";
import ChatRepository from "../../infrastructure/repositories/ChatRepository";
import CreateChatUseCase from "../../use_case/chat/CreateChatUseCase";
import VideoSocketManager from "./socketManagers/VideoSocketManager";
import ChatSocketManager from "./socketManagers/ChatSocketManager";
import JoiService from "../../infrastructure/services/JoiService";
import JWTService from "../../infrastructure/services/JWTService";
import GetChatUseCase from "../../use_case/chat/GetChatUseCase";
import SocketServer from "./SocketServer";
import StripePaymentService from "../../infrastructure/services/StripeService";
import PaymentRepository from "../../infrastructure/repositories/PaymentRepository";

const tokenService = new JWTService();
const validationService = new JoiService();
const paymentService = new StripePaymentService()

const appointmentRepository = new AppointmentRepository();
const videoRepository = new VideoSectionRepository();
const notificationRepository = new NotificationRepository();
const patientRepository = new PatientRepository();
const messageRepository = new MessageRepository();
const chatRepository = new ChatRepository();
const doctorRepository = new DoctorRepository();
const paymentRepository = new PaymentRepository()

const updateAppointmentUseCase = new UpdateAppointmentUseCase(
    appointmentRepository, validationService, notificationRepository, videoRepository, paymentService, paymentRepository
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

const initializeSocketIO = (server: HTTPServer) => {
    const socketServer = new SocketServer(server);
    const io = socketServer.getIO()
    new VideoSocketManager(io, updateAppointmentUseCase, tokenService);
    new ChatSocketManager(io, tokenService, createChatUseCase, getChatUseCase);
    new NotificationSocketManager(io, notificationUseCase, tokenService)
}

export default initializeSocketIO;