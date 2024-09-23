import express from 'express';
import ChatRepository from '../../../infrastructure/repositories/ChatRepository';
import MessageRepository from '../../../infrastructure/repositories/MessageRepository';
import CreateChatUseCase from '../../../use_case/chat/CreateChatUseCase';
import DoctorRepository from '../../../infrastructure/repositories/DoctorRepository';
import PatientRepository from '../../../infrastructure/repositories/PatientRepository';
import JoiService from '../../../infrastructure/services/JoiService';
import GetChatUseCase from '../../../use_case/chat/GetChatUseCase';
import ChatController from '../../controllers/chat/ChatControllers';

const router = express.Router();
const chatRepository = new ChatRepository();
const messageRepository = new MessageRepository();
const doctorRepository = new DoctorRepository();
const patientRepository = new PatientRepository();
const validatorService = new JoiService();

const createChatUseCase = new CreateChatUseCase(messageRepository,chatRepository,validatorService,patientRepository,doctorRepository)
const getChatUseCase = new GetChatUseCase(messageRepository,chatRepository,validatorService);
const chatController = new ChatController(createChatUseCase,getChatUseCase);


export default router;