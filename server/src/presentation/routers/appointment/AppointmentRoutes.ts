import { Router } from "express";
import AppointmentRepository from "../../../infrastructure/repositories/AppointmentRepository";
import SlotRepository from "../../../infrastructure/repositories/SlotRepository";
import CreateAppointmentUseCase from "../../../use_case/appointment/CreateAppointmentUseCase";
import AppointmentController from "../../controllers/appointment/AppointmentControllers";
import PatientAuthMiddleware from "../../middlewares/PatientAuthMiddleware";
import JWTService from "../../../infrastructure/services/JWTService";
import JoiService from "../../../infrastructure/services/JoiService";
import StripeService from "../../../infrastructure/services/StripeService";
import PaymentRepository from "../../../infrastructure/repositories/PaymentRepository";
import GetAppointmentUseCase from "../../../use_case/appointment/GetAppointmentUseCase";
import DoctorAuthMiddleware from "../../middlewares/DoctorAuthMiddleware";
import UpdateAppointmentUseCase from "../../../use_case/appointment/UpdateAppointmentUseCase";
import NotificationRepository from "../../../infrastructure/repositories/NotificationRepository";
import VideoSectionRepository from "../../../infrastructure/repositories/VideoSectionRepository";
import PatientRepository from "../../../infrastructure/repositories/PatientRepository";
import DoctorRepository from "../../../infrastructure/repositories/DoctorRepository";

const router = Router();

const appointmentRepository = new AppointmentRepository();
const slotRepository = new SlotRepository();
const tokenService = new JWTService();
const validatorService = new JoiService();

const paymentService = new StripeService();
const paymentRepository = new PaymentRepository();
const notificationRepository = new NotificationRepository();
const videoSectionRepository = new VideoSectionRepository();
const patientRepository = new PatientRepository();
const doctorRepository = new DoctorRepository();

const createAppointmentUseCase = new CreateAppointmentUseCase(
   appointmentRepository,
   slotRepository,
   validatorService,
   paymentService,
   paymentRepository,
   videoSectionRepository,
   doctorRepository,
   patientRepository
);
const getAppointmentUseCase = new GetAppointmentUseCase(appointmentRepository, validatorService, paymentRepository);
const updateAppointmentUseCase = new UpdateAppointmentUseCase(appointmentRepository, validatorService, notificationRepository);

const appointmentController = new AppointmentController(
   createAppointmentUseCase,
   getAppointmentUseCase,
   updateAppointmentUseCase
);
const authorizePatient = new PatientAuthMiddleware(tokenService);
const authorizeDoctor = new DoctorAuthMiddleware(tokenService);

// ! Patient Routes

router.get("/patient/details/:appointmentId", authorizePatient.exec, appointmentController.getAppointmentDetails);
router.get("/patient/succuss/:paymentId", authorizePatient.exec, appointmentController.getAppointmentSuccussDetails);
router.post("/patient/", authorizePatient.exec, appointmentController.create);
router.get("/patient/", authorizePatient.exec, appointmentController.getAppointmentsPatient);
router.put("/patient/", authorizePatient.exec, appointmentController.updateStatusAndNotes);

// ! Doctor Routes
router.get("/doctor/details/:appointmentId", authorizeDoctor.exec, appointmentController.getAppointmentDetails);
router.get("/doctor", authorizeDoctor.exec, appointmentController.getAppointmentsDoctor);
router.put("/doctor/", authorizeDoctor.exec, appointmentController.updateAppointment
);


export default router;

export const webhook = appointmentController.handleStripeWebhook;
