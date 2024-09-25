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

const router = express.Router();

const validatorService = new JoiService();
const tokenService = new JWTService();
const chatRepository = new ChatRepository();
const messageRepository = new MessageRepository();
const patientRepository = new PatientRepository();
const doctorRepository = new DoctorRepository();

const createChatUseCase = new CreateChatUseCase(
    messageRepository, chatRepository, validatorService, patientRepository, doctorRepository
);
const getChatUseCase = new GetChatUseCase(
    messageRepository, chatRepository, validatorService, patientRepository
);

const chatController = new ChatController(createChatUseCase, getChatUseCase);
const authorizePatient = new PatientAuthMiddleware(tokenService);
const authorizeDoctor = new DoctorAuthMiddleware(tokenService);

router.get('/patient', authorizePatient.exec, chatController.getChatsOfPatient.bind(chatController));
router.post('/patient', authorizePatient.exec, chatController.createChatPatient.bind(chatController));
router.post('/patient/message', authorizePatient.exec, chatController.createMessagePatient.bind(chatController));
router.get('/patient/message/:chatId', authorizePatient.exec, chatController.getMessagesOfChat.bind(chatController));

router.get('/doctor', authorizeDoctor.exec, chatController.getChatsOfDoctor.bind(chatController));
router.get('/doctor/patients', authorizeDoctor.exec, chatController.getPatientsDoctor.bind(chatController));
router.get('/doctor/message/:chatId', authorizeDoctor.exec, chatController.getMessagesOfChat.bind(chatController));
router.post('/doctor', authorizeDoctor.exec, chatController.createChatDoctor.bind(chatController));
router.post('/doctor/message', authorizeDoctor.exec, chatController.createMessageDoctor.bind(chatController));

export default router;