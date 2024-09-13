import express from 'express'
import DoctorRepository from '../../../infrastructure/repositories/DoctorRepository';
import SlotRepository from '../../../infrastructure/repositories/SlotRepository';
import SlotUseCase from '../../../use_case/slot/SlotUseCases';
import SlotContController from '../../controllers/slot/SlotController';
import DoctorAuthMiddleware from "../../middlewares/DoctorAuthMiddleware";
import TokenService from "../../../infrastructure/services/JWTService";
const router = express.Router();

const doctorRepository = new DoctorRepository();
const slotRepository = new SlotRepository();
const tokenService = new TokenService();

const authorizeDoctor = new DoctorAuthMiddleware(tokenService);

const slotUseCase = new SlotUseCase(doctorRepository, slotRepository);
const slotContController = new SlotContController(slotUseCase)


router.post('/', authorizeDoctor.exec.bind(authorizeDoctor), slotContController.create.bind(slotContController));
router.put('/', authorizeDoctor.exec.bind(authorizeDoctor), slotContController.update.bind(slotContController));
router.get('/:doctorId', slotContController.getAllSlots.bind(slotContController));
router.get('/:doctorId/day', slotContController.getSlotsOfDay.bind(slotContController));


export default router