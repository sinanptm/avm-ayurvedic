import {Router} from "express";
import patientAuthentication from "./patient/AuthenticationRoutes";
import adminAuthentication from "./admin/AuthenticationRoutes";
import protectedRoutes from "./patient/PatientRoutes";
import ErrorHandler from "../middlewares/ErrorHandler";
import TokenService from "../../infrastructure/services/JWTService";
import PatientAuthMiddleware from "../middlewares/PatientAuthMiddleware";
import AdminAuthMiddleware from "../middlewares/AdminAuthMiddleware";
import protectedAdminRoutes from "./admin/AdminRoutes";
import doctorAuthentication from "./doctor/AuthenticationRoutes";
import slotRoutes from "./slots/SlotsRoutes";
import UnauthenticatedUseCases from "../../use_case/UnauthenticatedUseCases";
import UnauthenticatedControllers from "../controllers/UnauthenticatedControllers";
import DoctorRepository from "../../infrastructure/repositories/DoctorRepository";
import appointmentRoutes from "./appointment/AppointmentRoutes";
import notificationRoutes from "./notification/NotificationRoute";
import chatRouters from "./chat/ChatRoutes";
import videoSectionRoute from "./video/VideoSectionRoute";

const app = Router();
const tokenService = new TokenService();

const authorizePatient = new PatientAuthMiddleware(tokenService);
const authorizeAdmin = new AdminAuthMiddleware(tokenService);

const doctorRepository = new DoctorRepository();
const unauthenticatedUseCase = new UnauthenticatedUseCases(doctorRepository);
const unauthenticatedController = new UnauthenticatedControllers(unauthenticatedUseCase);

const errorHandler = new ErrorHandler();

app.get("/doctors", unauthenticatedController.getDoctors);
app.use("/doctor/auth", doctorAuthentication);
app.use("/patient/auth", patientAuthentication);
app.use("/patient", authorizePatient.exec, protectedRoutes);
app.use("/admin/auth", adminAuthentication);
app.use("/admin", authorizeAdmin.exec, protectedAdminRoutes);
app.use("/slots", slotRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/notifications", notificationRoutes);
app.use("/chats", chatRouters);
app.use("/video", videoSectionRoute);

app.use(errorHandler.exec.bind(errorHandler));

export default app;
