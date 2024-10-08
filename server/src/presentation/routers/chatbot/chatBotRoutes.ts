import { Router } from 'express';
import createControllers from "../../di/controllers";


const router = Router();
const { chatBotController } = createControllers;

router.post('/', chatBotController.createMessage.bind(chatBotController));
router.get('/', chatBotController.getMessages.bind(chatBotController));

export default router;