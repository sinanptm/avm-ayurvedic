import express from 'express'
import AppointmentRepository from '../../../infrastructure/repositories/AppointmentRepository';
import SlotRepository from '../../../infrastructure/repositories/SlotRepository';
import CreateAppointmentUseCase from '../../../use_case/appointment/CreateAppointmentUseCase';
import AppointmentController from '../../controllers/appointment/AppointmentControllers';
import PatientAuthMiddleware from '../../middlewares/PatientAuthMiddleware';
import JWTService from '../../../infrastructure/services/JWTService';
import JoiService from '../../../infrastructure/services/JoiService';
import RazorPayService from '../../../infrastructure/services/RazorPayService';
import PaymentRepository from '../../../infrastructure/repositories/PaymentRepository';
import PatientRepository from '../../../infrastructure/repositories/PatientRepository';
import GetAppointmentUseCase from '../../../use_case/appointment/GetAppointmentUseCase';
import DoctorAuthMiddleware from '../../middlewares/DoctorAuthMiddleware';

const router = express.Router();


const appointmentRepository = new AppointmentRepository();
const slotRepository = new SlotRepository();
const tokenService = new JWTService();
const validatorService = new JoiService();

const paymentService = new RazorPayService();
const paymentRepository = new PaymentRepository();
const patientRepository = new PatientRepository()

const createAppointmentUseCase = new CreateAppointmentUseCase(appointmentRepository, slotRepository, validatorService, paymentService, paymentRepository, patientRepository);
const getAppointmentUseCase = new GetAppointmentUseCase(appointmentRepository, validatorService);

const appointmentController = new AppointmentController(createAppointmentUseCase, getAppointmentUseCase);
const authorizePatient = new PatientAuthMiddleware(tokenService);
const authorizeDoctor = new DoctorAuthMiddleware(tokenService);


router.post('/verify-payment', authorizePatient.exec.bind(authorizePatient), appointmentController.completePayment.bind(appointmentController))
router.post('/', authorizePatient.exec.bind(authorizePatient), appointmentController.create.bind(appointmentController));
router.get('/doctor', authorizeDoctor.exec.bind(authorizeDoctor), appointmentController.getAppointmentsDoctor.bind(appointmentController))

export default router;