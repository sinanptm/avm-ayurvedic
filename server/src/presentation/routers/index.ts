import express from "express";
import patientAuthentication from "./patient/AuthenticationRoutes";
import adminAuthentication from "./admin/AuthenticationRoutes";
import ProtectedRoutes from "./patient/PatientRoutes";
import ErrorHandler from "../middlewares/ErrorHandler";
import TokenService from "../../infrastructure/services/JWTService";
import PatientAuthMiddleware from "../middlewares/PatientAuthMiddleware";

const app = express();
const tokenService = new TokenService();

const authenticatePatient = new PatientAuthMiddleware(tokenService);


const errorHandler = new ErrorHandler();

app.use("/patient/auth", patientAuthentication);
app.use("/patient", authenticatePatient.exec, ProtectedRoutes);

app.use('/admin/auth',adminAuthentication)


app.use(errorHandler.exec.bind(errorHandler));

export default app;
