import { Router } from "express";
import UnauthenticatedControllers from "../controllers/UnauthenticatedControllers";
import DoctorRepository from "../../infrastructure/repositories/DoctorRepository";
import UnauthenticatedUseCases from "../../use_case/UnauthenticatedUseCases";
import PatientAuthMiddleware from "../middlewares/PatientAuthMiddleware";
import DoctorAuthMiddleware from "../middlewares/DoctorAuthMiddleware";
import AdminAuthMiddleware from "../middlewares/AdminAuthMiddleware";
import TokenService from "../../infrastructure/services/JWTService";
import patientAuthentication from "./patient/AuthenticationRoutes";
import prescriptionRoutes from "./prescription/PrescriptionRoutes";
import doctorAuthentication from "./doctor/AuthenticationRoutes";
import appointmentRoutes from "./appointment/AppointmentRoutes";
import adminAuthentication from "./admin/AuthenticationRoutes";
import doctorProtectedRoutes from "./doctor/AuthorizedRoutes";
import videoSectionRoutes from "./video/VideoSectionRoute";
import protectedAdminRoutes from "./admin/AdminRoutes";
import ErrorHandler from "../middlewares/ErrorHandler";
import protectedRoutes from "./patient/PatientRoutes";
import slotRoutes from "./slots/SlotsRoutes";
import chatRoutes from "./chat/ChatRoutes";

const app = Router();
const tokenService = new TokenService();

const authorizePatient = new PatientAuthMiddleware(tokenService);
const authorizeAdmin = new AdminAuthMiddleware(tokenService);
const authorizeDoctor = new DoctorAuthMiddleware(tokenService);

const doctorRepository = new DoctorRepository();
const unauthenticatedUseCase = new UnauthenticatedUseCases(doctorRepository);
const unauthenticatedController = new UnauthenticatedControllers(unauthenticatedUseCase);

const errorHandler = new ErrorHandler();

app.get("/doctors", unauthenticatedController.getDoctors.bind(unauthenticatedController));
app.use("/doctor/auth", doctorAuthentication);
app.use("/doctor", authorizeDoctor.exec, doctorProtectedRoutes)
app.use("/patient/auth", patientAuthentication);
app.use("/patient", authorizePatient.exec, protectedRoutes);
app.use("/admin/auth", adminAuthentication);
app.use("/admin", authorizeAdmin.exec, protectedAdminRoutes);
app.use("/slots", slotRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/chats", chatRoutes);
app.use("/video", videoSectionRoutes);
app.use("/prescription", prescriptionRoutes)

app.use(errorHandler.exec.bind(errorHandler));

export default app;
