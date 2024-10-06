import { Router } from "express";
import NotificationRepository from "../../../infrastructure/repositories/NotificationRepository";
import VideoSectionRepository from "../../../infrastructure/repositories/VideoSectionRepository";
import PrescriptionRepository from "../../../infrastructure/repositories/PrescriptionRepository";
import AppointmentRepository from "../../../infrastructure/repositories/AppointmentRepository";
import CreateAppointmentUseCase from "../../../use_case/appointment/CreateAppointmentUseCase";
import UpdateAppointmentUseCase from "../../../use_case/appointment/UpdateAppointmentUseCase";
import AppointmentController from "../../controllers/appointment/AppointmentControllers";
import GetAppointmentUseCase from "../../../use_case/appointment/GetAppointmentUseCase";
import PatientRepository from "../../../infrastructure/repositories/PatientRepository";
import PaymentRepository from "../../../infrastructure/repositories/PaymentRepository";
import DoctorRepository from "../../../infrastructure/repositories/DoctorRepository";
import SlotRepository from "../../../infrastructure/repositories/SlotRepository";
import PatientAuthMiddleware from "../../middlewares/PatientAuthMiddleware";
import StripeService from "../../../infrastructure/services/StripeService";
import DoctorAuthMiddleware from "../../middlewares/DoctorAuthMiddleware";
import UUIDService from "../../../infrastructure/services/UUIDService";
import JWTService from "../../../infrastructure/services/JWTService";
import JoiService from "../../../infrastructure/services/JoiService";

const router = Router();

const slotRepository = new SlotRepository();
const validatorService = new JoiService();
const paymentService = new StripeService();
const tokenService = new JWTService();
const uuIdService = new UUIDService()

const appointmentRepository = new AppointmentRepository();
const paymentRepository = new PaymentRepository();
const notificationRepository = new NotificationRepository();
const videoSectionRepository = new VideoSectionRepository();
const patientRepository = new PatientRepository();
const doctorRepository = new DoctorRepository();
const prescriptionRepository = new PrescriptionRepository();

const createAppointmentUseCase = new CreateAppointmentUseCase(
   appointmentRepository,
   slotRepository,
   validatorService,
   paymentService,
   paymentRepository,
   videoSectionRepository,
   doctorRepository,
   patientRepository,
   uuIdService
);
const getAppointmentUseCase = new GetAppointmentUseCase(
   appointmentRepository, validatorService, paymentRepository, prescriptionRepository
);
const updateAppointmentUseCase = new UpdateAppointmentUseCase(
   appointmentRepository, validatorService, notificationRepository, videoSectionRepository, paymentService, paymentRepository
);

const appointmentController = new AppointmentController(
   createAppointmentUseCase, getAppointmentUseCase, updateAppointmentUseCase
);
const authorizePatient = new PatientAuthMiddleware(tokenService);
const authorizeDoctor = new DoctorAuthMiddleware(tokenService);

// ! Patient Routes

router.get("/patient/details/:appointmentId", authorizePatient.exec, appointmentController.getAppointmentDetails.bind(appointmentController));
router.get("/patient/succuss/:paymentId", authorizePatient.exec, appointmentController.getAppointmentSuccussDetails.bind(appointmentController));
router.post("/patient/", authorizePatient.exec, appointmentController.create.bind(appointmentController));
router.get("/patient/", authorizePatient.exec, appointmentController.getAppointmentsPatient.bind(appointmentController));
router.put("/patient/", authorizePatient.exec, appointmentController.updateStatusAndNotes.bind(appointmentController));

// ! Doctor Routes
router.get("/doctor/details/:appointmentId", authorizeDoctor.exec, appointmentController.getAppointmentDetails.bind(appointmentController));
router.get("/doctor", authorizeDoctor.exec, appointmentController.getAppointmentsDoctor.bind(appointmentController));
router.put("/doctor/", authorizeDoctor.exec, appointmentController.updateAppointment.bind(appointmentController));


export default router;

export const webhook = appointmentController.handleStripeWebhook.bind(appointmentController);
