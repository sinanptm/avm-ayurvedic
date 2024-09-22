import express from "express";
import NotificationRepository from "../../../infrastructure/repositories/NotificationRepository";
import JoiService from "../../../infrastructure/services/JoiService";
import NotificationController from "../../controllers/notification/NotificationController";
import JWTService from "../../../infrastructure/services/JWTService";
import DoctorAuthMiddleware from "../../middlewares/DoctorAuthMiddleware";
import PatientAuthMiddleware from "../../middlewares/PatientAuthMiddleware";
import NotificationUseCase from "../../../use_case/notification/NotificationUseCae";

const router = express.Router();

const notificationRepository = new NotificationRepository();
const validatorService = new JoiService();
const tokenService = new JWTService();

const notificationUseCase = new NotificationUseCase(notificationRepository, validatorService);
const notificationController = new NotificationController(notificationUseCase);

const authorizeDoctor = new DoctorAuthMiddleware(tokenService);
const authorizePatient = new PatientAuthMiddleware(tokenService);

// ! Patient Routes

router.get(
    "/patient",
    authorizePatient.exec,
    notificationController.getAllPatientNotifications.bind(notificationController)
);

router.delete(
    "/patient/clear-all",
    authorizePatient.exec,
    notificationController.clearMultipleNotifications.bind(notificationController)
);

router.delete(
    "/patient/clear/:notificationId",
    authorizePatient.exec,
    notificationController.clearSingleNotification.bind(notificationController)
);

// ! Doctor Routes

router.get(
    "/doctor",
    authorizeDoctor.exec,
    notificationController.getAllDoctorNotifications.bind(notificationController)
);

router.delete(
    "/doctor/clear-all",
    authorizeDoctor.exec,
    notificationController.clearMultipleNotifications.bind(notificationController)
);

router.delete(
    "/doctor/clear/:notificationId",
    authorizeDoctor.exec,
    notificationController.clearSingleNotification.bind(notificationController)
);

export default router;
