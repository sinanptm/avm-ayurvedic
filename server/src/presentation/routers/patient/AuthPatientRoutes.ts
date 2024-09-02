import express from "express";
import PatientRepository from "../../../infrastructure/repositories/PatientRepository";
import PasswordService from "../../../infrastructure/services/PasswordService";
import EmailService from "../../../infrastructure/services/EmailService";
import OtpRepository from "../../../infrastructure/repositories/OtpRepository";
import TokenService from "../../../infrastructure/services/TokenService";
import AuthPatientController from "../../controllers/AuthPatientController";
import AuthPatientUseCase from "../../../use_case/patient/AuthPatientUseCase";

const route = express.Router();

// Services and Repositories
const patientRepository = new PatientRepository();
const passwordService = new PasswordService();
const emailService = new EmailService();
const otpRepository = new OtpRepository();
const tokenService = new TokenService();

const authPatientUseCase = new AuthPatientUseCase(
   patientRepository,
   passwordService,
   emailService,
   otpRepository,
   tokenService
);
const authPatientController = new AuthPatientController(authPatientUseCase);

route.post("/register", authPatientController.register.bind(authPatientController));
route.post("/login", authPatientController.login.bind(authPatientController));
route.post("/oauth-signin", authPatientController.oAuthSignin.bind(authPatientController));
route.post("/resend-otp", authPatientController.resendOtp.bind(authPatientController));
route.post("/otp-verification", authPatientController.validateOtp.bind(authPatientController));
route.get("/refresh", authPatientController.refreshAccessToken.bind(authPatientController));
route.post("/forget-password", authPatientController.forgetPassword.bind(authPatientController));
route.patch("/update-password", authPatientController.updatePassword.bind(authPatientController));
route.post("/logout", authPatientController.logout.bind(authPatientController));

export default route;
