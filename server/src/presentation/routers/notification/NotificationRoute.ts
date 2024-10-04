import { Router } from "express";
import NotificationRepository from "../../../infrastructure/repositories/NotificationRepository";
import NotificationController from "../../controllers/notification/NotificationController";
import NotificationUseCase from "../../../use_case/notification/NotificationUseCae";
import PatientAuthMiddleware from "../../middlewares/PatientAuthMiddleware";
import DoctorAuthMiddleware from "../../middlewares/DoctorAuthMiddleware";
import JoiService from "../../../infrastructure/services/JoiService";
import JWTService from "../../../infrastructure/services/JWTService";

const router = Router();

const notificationRepository = new NotificationRepository();
const validatorService = new JoiService();
const tokenService = new JWTService();

const notificationUseCase = new NotificationUseCase(notificationRepository, validatorService);
const notificationController = new NotificationController(notificationUseCase);

const authorizeDoctor = new DoctorAuthMiddleware(tokenService);
const authorizePatient = new PatientAuthMiddleware(tokenService);

// ! Patient Routes

router.get("/patient", authorizePatient.exec, notificationController.getAllPatientNotifications.bind(notificationController));
router.delete("/patient/clear-all", authorizePatient.exec, notificationController.clearMultipleNotifications.bind(notificationController));
router.delete("/patient/:notificationId", authorizePatient.exec, notificationController.clearSingleNotification.bind(notificationController));

// ! Doctor Routes
router.get("/doctor", authorizeDoctor.exec, notificationController.getAllDoctorNotifications.bind(notificationController));
router.delete("/doctor/clear-all", authorizeDoctor.exec, notificationController.clearMultipleNotifications.bind(notificationController));
router.delete("/doctor/:notificationId", authorizeDoctor.exec, notificationController.clearSingleNotification.bind(notificationController));

export default router;
