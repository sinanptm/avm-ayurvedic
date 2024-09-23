import express from 'express';
import ChatRepository from '../../../infrastructure/repositories/ChatRepository';
import MessageRepository from '../../../infrastructure/repositories/MessageRepository';
import PatientRepository from '../../../infrastructure/repositories/PatientRepository';
import DoctorRepository from '../../../infrastructure/repositories/DoctorRepository';
import CreateChatUseCase from '../../../use_case/chat/CreateChatUseCase';
import JoiService from '../../../infrastructure/services/JoiService';
import GetChatUseCase from '../../../use_case/chat/GetChatUseCase';
import ChatController from '../../controllers/chat/ChatControllers';
import JWTService from '../../../infrastructure/services/JWTService';
import PatientAuthMiddleware from '../../middlewares/PatientAuthMiddleware';
import DoctorAuthMiddleware from '../../middlewares/DoctorAuthMiddleware';

const router = express.Router()

const validatorService = new JoiService()
const tokenService = new JWTService();
const chatRepository = new ChatRepository();
const messageRepository = new MessageRepository();
const patientRepository = new PatientRepository();
const doctorRepository = new DoctorRepository();

const createChatUseCase = new CreateChatUseCase(messageRepository, chatRepository, validatorService, patientRepository, doctorRepository);
const getChatUseCase = new GetChatUseCase(messageRepository, chatRepository, validatorService);

const chatController = new ChatController(createChatUseCase, getChatUseCase);
const authorizePatient = new PatientAuthMiddleware(tokenService);
const authorizeDoctor = new DoctorAuthMiddleware(tokenService);


export default router