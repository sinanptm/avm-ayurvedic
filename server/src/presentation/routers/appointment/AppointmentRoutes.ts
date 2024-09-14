import express from 'express'
import AppointmentRepository from '../../../infrastructure/repositories/AppointmentRepository';
import SlotRepository from '../../../infrastructure/repositories/SlotRepository';
import AppointmentUseCase from '../../../use_case/appointment/AppointmentUseCase';
import AppointmentController from '../../controllers/appointment/AppointmentControllers';
import AppointmentValidator from '../../validators/AppointmentValidator';
import PatientAuthMiddleware from '../../middlewares/PatientAuthMiddleware';
import JWTService from '../../../infrastructure/services/JWTService';

const router = express.Router();


const appointmentRepository = new AppointmentRepository();
const slotRepository = new SlotRepository();
const tokenService = new JWTService()

const appointmentUseCase = new AppointmentUseCase(appointmentRepository, slotRepository);

const appointmentValidator = new AppointmentValidator()
const appointmentController = new AppointmentController(appointmentUseCase, appointmentValidator);

const authorizePatient = new PatientAuthMiddleware(tokenService);

router.post('/', authorizePatient.exec.bind(authorizePatient), appointmentController.create.bind(appointmentController));

export default router;