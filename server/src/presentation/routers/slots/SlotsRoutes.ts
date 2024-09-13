import express from 'express'
import SlotRepository from '../../../infrastructure/repositories/SlotRepository';
import SlotUseCase from '../../../use_case/slot/SlotUseCases';
import SlotContController from '../../controllers/slot/SlotController';
import DoctorAuthMiddleware from "../../middlewares/DoctorAuthMiddleware";
import TokenService from "../../../infrastructure/services/JWTService";
const router = express.Router();

const slotRepository = new SlotRepository();
const tokenService = new TokenService();

const authorizeDoctor = new DoctorAuthMiddleware(tokenService);

const slotUseCase = new SlotUseCase(slotRepository);
const slotContController = new SlotContController(slotUseCase)


router.post('/', authorizeDoctor.exec.bind(authorizeDoctor), slotContController.createSlotsForDay.bind(slotContController))
router.put('/', authorizeDoctor.exec.bind(authorizeDoctor), slotContController.update.bind(slotContController));
router.get('/doctor', authorizeDoctor.exec.bind(authorizeDoctor), slotContController.getAllDoctorSlots.bind(slotContController))
router.get('/:doctorId', slotContController.getAllSlotsByDoctorId.bind(slotContController));

export default router