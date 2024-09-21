import express from 'express'
import AppointmentRepository from '../../../infrastructure/repositories/AppointmentRepository';
import SlotRepository from '../../../infrastructure/repositories/SlotRepository';
import CreateAppointmentUseCase from '../../../use_case/appointment/CreateAppointmentUseCase';
import AppointmentController from '../../controllers/appointment/AppointmentControllers';
import PatientAuthMiddleware from '../../middlewares/PatientAuthMiddleware';
import JWTService from '../../../infrastructure/services/JWTService';
import JoiService from '../../../infrastructure/services/JoiService';
import StripeService from '../../../infrastructure/services/StripeService';
import PaymentRepository from '../../../infrastructure/repositories/PaymentRepository';
import PatientRepository from '../../../infrastructure/repositories/PatientRepository';
import GetAppointmentUseCase from '../../../use_case/appointment/GetAppointmentUseCase';
import DoctorAuthMiddleware from '../../middlewares/DoctorAuthMiddleware';
import UpdateAppointmentUseCase from '../../../use_case/appointment/UpdateAppointmentUseCase';

const router = express.Router();


const appointmentRepository = new AppointmentRepository();
const slotRepository = new SlotRepository();
const tokenService = new JWTService();
const validatorService = new JoiService();

const paymentService = new StripeService();
const paymentRepository = new PaymentRepository();
const patientRepository = new PatientRepository()

const createAppointmentUseCase = new CreateAppointmentUseCase(appointmentRepository, slotRepository, validatorService, paymentService, paymentRepository, patientRepository);
const getAppointmentUseCase = new GetAppointmentUseCase(appointmentRepository, validatorService);
const updateAppointmentUseCase = new UpdateAppointmentUseCase(appointmentRepository, validatorService)

const appointmentController = new AppointmentController(createAppointmentUseCase, getAppointmentUseCase, updateAppointmentUseCase);
const authorizePatient = new PatientAuthMiddleware(tokenService);
const authorizeDoctor = new DoctorAuthMiddleware(tokenService);


router.post('/webhook', authorizePatient.exec, appointmentController.handleStripeWebhook.bind(appointmentController));
router.get('/patient/details/:appointmentId', authorizePatient.exec, appointmentController.getAppointmentDetails.bind(appointmentController));
router.post('/patient/', authorizePatient.exec, appointmentController.create.bind(appointmentController));
router.get('/patient/', authorizePatient.exec, appointmentController.getAppointmentsPatient.bind(appointmentController));
router.put('/patient/', authorizePatient.exec, appointmentController.updateStatusAndNotes.bind(appointmentController));

router.get('/doctor/details/:appointmentId', authorizeDoctor.exec, appointmentController.getAppointmentDetails.bind(appointmentController));
router.get('/doctor', authorizeDoctor.exec, appointmentController.getAppointmentsDoctor.bind(appointmentController));
router.put('/doctor/', authorizeDoctor.exec, appointmentController.updateAppointment.bind(appointmentController));

export default router;