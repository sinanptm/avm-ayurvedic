import express from "express";
import patientAuthentication from "./patient/AuthenticationRoutes";
import adminAuthentication from "./admin/AuthenticationRoutes";
import ProtectedRoutes from "./patient/PatientRoutes";
import ErrorHandler from "../middlewares/ErrorHandler";
import TokenService from "../../infrastructure/services/JWTService";
import PatientAuthMiddleware from "../middlewares/PatientAuthMiddleware";
import AdminAuthMiddleware from "../middlewares/AdminAuthMiddleware";

const app = express();
const tokenService = new TokenService();

const authorizePatient = new PatientAuthMiddleware(tokenService);
const authorizeAdmin = new AdminAuthMiddleware(tokenService);

const errorHandler = new ErrorHandler();

app.use("/patient/auth", patientAuthentication);
app.use("/patient", authorizePatient.exec.bind(authorizePatient), ProtectedRoutes);

app.use("/admin/auth", adminAuthentication);
app.get("/admin/", authorizeAdmin.exec.bind(authorizeAdmin), (req, res, next) => {
   res.status(200).json({ name: "sinan" });
});

app.use(errorHandler.exec.bind(errorHandler));

export default app;
