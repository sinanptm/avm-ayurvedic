import express from "express";
import AuthRoutes from "./patient/AuthPatientRoutes";
import ProtectedRoutes from "./patient/PatientRoutes";
import { errorHandler } from "../middlewares/errorHandler";
import TokenService from "../../infrastructure/services/TokenService";
import PatientAuthMiddleware from "../middlewares/PatientAuthMiddleware";

const app = express();
const tokenService = new TokenService();
const authenticatePatient = new PatientAuthMiddleware(tokenService);

app.use("/patient/auth", AuthRoutes);
app.use("/patient", authenticatePatient.exec, ProtectedRoutes);
app.use(errorHandler);

export default app;
