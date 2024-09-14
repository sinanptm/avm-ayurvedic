import express from "express";
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

const app = express();
const tokenService = new TokenService();

const authorizePatient = new PatientAuthMiddleware(tokenService);
const authorizeAdmin = new AdminAuthMiddleware(tokenService);

const doctorRepository = new DoctorRepository()
const unauthenticatedUseCase = new UnauthenticatedUseCases(doctorRepository)
const unauthenticatedController = new UnauthenticatedControllers(unauthenticatedUseCase)

const errorHandler = new ErrorHandler();

app.get('/doctors', unauthenticatedController.getDoctors.bind(unauthenticatedController))
app.use("/patient/auth", patientAuthentication);
app.use("/patient", authorizePatient.exec.bind(authorizePatient), protectedRoutes);
app.use("/admin/auth", adminAuthentication);
app.use("/admin", authorizeAdmin.exec.bind(authorizeAdmin), protectedAdminRoutes);
app.use("/doctor/auth", doctorAuthentication);
app.use('/slots', slotRoutes);
app.use('/appointment', appointmentRoutes)


app.use(errorHandler.exec.bind(errorHandler));

export default app;
