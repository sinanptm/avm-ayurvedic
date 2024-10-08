import PatientAuthMiddleware from "../middlewares/PatientAuthMiddleware";
import DoctorAuthMiddleware from "../middlewares/DoctorAuthMiddleware";
import AdminAuthMiddleware from "../middlewares/AdminAuthMiddleware";
import ErrorHandler from "../middlewares/ErrorHandler";
import { jwtService } from "./services";


export const authorizePatient = new PatientAuthMiddleware(jwtService);
export const authorizeDoctor = new DoctorAuthMiddleware(jwtService);
export const authorizeAdmin = new AdminAuthMiddleware(jwtService);
export const errorHandler = new ErrorHandler();
