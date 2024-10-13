import { Router } from "express";
import { authorizeAdmin, authorizeDoctor, authorizePatient, errorHandler } from "../di/middlewares";
import patientAuthentication from "./patient/AuthenticationRoutes";
import prescriptionRoutes from "./prescription/PrescriptionRoutes";
import doctorAuthentication from "./doctor/AuthenticationRoutes";
import appointmentRoutes from "./appointment/AppointmentRoutes";
import adminAuthentication from "./admin/AuthenticationRoutes";
import doctorProtectedRoutes from "./doctor/AuthorizedRoutes";
import videoSectionRoutes from "./video/VideoSectionRoute";
import protectedAdminRoutes from "./admin/AdminRoutes";
import protectedRoutes from "./patient/PatientRoutes";
import createControllers from "../di/controllers";
import chatBotRoutes from "./chatbot/chatBotRoutes";
import slotRoutes from "./slots/SlotsRoutes";

const app = Router();
const { unauthenticatedController } = createControllers;

app.get("/doctors", unauthenticatedController.getDoctors.bind(unauthenticatedController));
app.use("/doctor/auth", doctorAuthentication);
app.use("/doctor", authorizeDoctor.exec, doctorProtectedRoutes);
app.use("/patient/auth", patientAuthentication);
app.use("/patient", authorizePatient.exec, protectedRoutes);
app.use("/admin/auth", adminAuthentication);
app.use("/admin", authorizeAdmin.exec, protectedAdminRoutes);
app.use("/slots", slotRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/video", videoSectionRoutes);
app.use("/prescription", prescriptionRoutes);
app.use("/chatbot", authorizePatient.exec, chatBotRoutes);

app.use(errorHandler.exec.bind(errorHandler));

export default app;
