import PatientAuthMiddleware from "../presentation/middlewares/PatientAuthMiddleware";
import DoctorAuthMiddleware from "../presentation/middlewares/DoctorAuthMiddleware";
import AdminAuthMiddleware from "../presentation/middlewares/AdminAuthMiddleware";
import ErrorHandler from "../presentation/middlewares/ErrorHandler";
import { jwtService } from "./services";


export const authorizePatient = new PatientAuthMiddleware(jwtService);
export const authorizeDoctor = new DoctorAuthMiddleware(jwtService);
export const authorizeAdmin = new AdminAuthMiddleware(jwtService);
export const errorHandler = new ErrorHandler();
