import express from "express";
import PatientRepository from "../../../infrastructure/repositories/PatientRepository";
import PasswordService from "../../../infrastructure/services/PasswordService";
import AuthPatientController from "../../controllers/AuthPatientController";
import AuthPatientUseCase from "../../../use_case/patient/AuthPatientUseCase";
import EmailService from "../../../infrastructure/services/EmailService";
import OtpRepository from "../../../infrastructure/repositories/OtpRepository";
import TokenService from "../../../infrastructure/services/TokenService";
import PatientAuthMiddleware from "../../middlewares/PatientAuthMiddleware";

const route = express.Router();

// Services and Repositories
const emailService = new EmailService();
const tokenService = new TokenService();
const otpRepository = new OtpRepository();
const passwordService = new PasswordService();
const patientRepository = new PatientRepository();

// Use Case
const authPatientUseCase = new AuthPatientUseCase(
   patientRepository,
   passwordService,
   emailService,
   otpRepository,
   tokenService
);

// Controller
const authPatientController = new AuthPatientController(authPatientUseCase);

// Middleware
const patientAuthMiddleware = new PatientAuthMiddleware(tokenService);

const { exec: authenticate } = patientAuthMiddleware;
const {
   forgetPassword,
   login,
   logout,
   oAuthSignin,
   refreshAccessToken,
   register,
   resendOtp,
   updatePassword,
   validateOtp,
} = authPatientController;

route.post("/register", register);
route.post("/login", login);
route.post("/oauth-signin", oAuthSignin);
route.post("/resend-otp", resendOtp);
route.post("/otp-verification", validateOtp);
route.get("/refresh", refreshAccessToken);
route.post("/forget-password", forgetPassword);
route.patch("/update-password", updatePassword);
route.post("/logout", authenticate, logout);

export default route;
