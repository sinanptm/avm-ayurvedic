import express from "express";
import AuthRoutes from "./patient/AuthenticationRoutes";
import ProtectedRoutes from "./patient/PatientRoutes";
import ErrorHandler from "../middlewares/ErrorHandler";
import TokenService from "../../infrastructure/services/TokenService";
import PatientAuthMiddleware from "../middlewares/PatientAuthMiddleware";

const app = express();
const tokenService = new TokenService();
const authenticate = new PatientAuthMiddleware(tokenService);
const errorHandler = new ErrorHandler();


app.use("/patient/auth", AuthRoutes);
app.use("/patient", authenticate.exec, ProtectedRoutes);


app.use(errorHandler.exec.bind(errorHandler));

export default app;
