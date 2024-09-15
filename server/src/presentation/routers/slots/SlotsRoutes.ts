import express from 'express';
import SlotRepository from '../../../infrastructure/repositories/SlotRepository';
import SlotUseCase from '../../../use_case/slot/SlotUseCases';
import SlotController from '../../controllers/slot/SlotController';
import DoctorAuthMiddleware from '../../middlewares/DoctorAuthMiddleware';
import TokenService from '../../../infrastructure/services/JWTService';
import AppointmentRepository from '../../../infrastructure/repositories/AppointmentRepository';
import JoiService from '../../../infrastructure/services/JoiService';

const router = express.Router();

const slotRepository = new SlotRepository();
const tokenService = new TokenService();
const authorizeDoctor = new DoctorAuthMiddleware(tokenService);
const appointmentRepository = new AppointmentRepository()
const validatorService = new JoiService()

const slotUseCase = new SlotUseCase(slotRepository, appointmentRepository, validatorService);
const slotController = new SlotController(slotUseCase);

router.post('/day', authorizeDoctor.exec.bind(authorizeDoctor), slotController.createManyByDay.bind(slotController));
router.post('/all-days', authorizeDoctor.exec.bind(authorizeDoctor), slotController.createForAllDays.bind(slotController));
router.delete('/day', authorizeDoctor.exec.bind(authorizeDoctor), slotController.deleteManyByDay.bind(slotController));
router.delete('/all-days', authorizeDoctor.exec.bind(authorizeDoctor), slotController.deleteForAllDays.bind(slotController));
router.get('/doctor', authorizeDoctor.exec.bind(authorizeDoctor), slotController.getAllDoctorSlots.bind(slotController));
router.get('/:doctorId', slotController.getAllSlotsByDoctorId.bind(slotController));

export default router;
