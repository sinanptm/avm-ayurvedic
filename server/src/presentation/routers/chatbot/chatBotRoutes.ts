import { Router } from 'express';
import ChaBotMessageRepository from '../../../infrastructure/repositories/ChatBotMessageRepository';
import ChatBotController from '../../controllers/chatbot/ChatBotController';
import ChatBotUseCase from '../../../use_case/chatbot/ChatBotUseCase';
import GeminiBotService from '../../../infrastructure/services/GeminiBotService';
import JoiService from '../../../infrastructure/services/JoiService';

const router = Router();

const chatBotService = new GeminiBotService();
const validatorService = new JoiService();

const chatBotMessageRepository = new ChaBotMessageRepository();

const chatBotUseCase = new ChatBotUseCase(chatBotMessageRepository, chatBotService, validatorService);
const chatBotController = new ChatBotController(chatBotUseCase);

router.post('/', chatBotController.createMessage.bind(chatBotController));
router.get('/', chatBotController.getMessages.bind(chatBotController));

export default router;