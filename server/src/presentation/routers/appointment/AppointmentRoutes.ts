import express from 'express'
import AppointmentRepository from '../../../infrastructure/repositories/AppointmentRepository';
import SlotRepository from '../../../infrastructure/repositories/SlotRepository';
import AppointmentUseCase from '../../../use_case/appointment/AppointmentUseCase';
import AppointmentController from '../../controllers/appointment/AppointmentControllers';
import PatientAuthMiddleware from '../../middlewares/PatientAuthMiddleware';
import JWTService from '../../../infrastructure/services/JWTService';
import JoiService from '../../../infrastructure/services/JoiService';

const router = express.Router();


const appointmentRepository = new AppointmentRepository();
const slotRepository = new SlotRepository();
const tokenService = new JWTService()
const validatorService = new JoiService()

const appointmentUseCase = new AppointmentUseCase(appointmentRepository, slotRepository, validatorService);

const appointmentController = new AppointmentController(appointmentUseCase);

const authorizePatient = new PatientAuthMiddleware(tokenService);

router.post('/', authorizePatient.exec.bind(authorizePatient), appointmentController.create.bind(appointmentController));

export default router;