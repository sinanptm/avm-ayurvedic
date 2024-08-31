import express from "express";
import PatientRepository from "../../../infrastructure/repositories/PatientRepository";
import PasswordService from "../../../infrastructure/services/PasswordService";
import RegisterPatientUseCase from "../../../use_case/patient/RegisterPatientUseCase";
import PatientController from "../../controllers/PatientController";
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

// Use Cases
const registerPatientUseCase = new RegisterPatientUseCase(patientRepository, passwordService);
const authPatientUseCase = new AuthPatientUseCase(
   patientRepository,
   passwordService,
   emailService,
   otpRepository,
   tokenService
);

// Controllers
const patientController = new PatientController(registerPatientUseCase, authPatientUseCase);

// Middleware
const patientAuthMiddleware = new PatientAuthMiddleware(tokenService);


route.post("/register", (req, res, next) => {
   patientController.register(req, res, next);
});
route.post("/login", (req, res, next) => {
   patientController.login(req, res, next);
});
route.post("/resend-otp", (req, res, next) => {
   patientController.resendOtp(req, res, next);
});
route.post("/otp-verification", (req, res, next) => {
   patientController.validateOtp(req, res, next);
});
route.get("/refresh", (req, res, next) => {
   patientController.refreshAccessToken(req, res, next);
});
route.post("/reset-password", (req, res, next) => {
   patientController.resetPassword(req, res, next);
});
route.post("/logout", patientAuthMiddleware.exec, (req, res, next) => {
   patientController.logout(req, res, next);
});

export default route;
