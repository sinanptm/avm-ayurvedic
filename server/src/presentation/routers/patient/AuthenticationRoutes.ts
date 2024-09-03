import express from "express";
import PatientRepository from "../../../infrastructure/repositories/PatientRepository";
import PasswordService from "../../../infrastructure/services/PasswordService";
import EmailService from "../../../infrastructure/services/EmailService";
import OtpRepository from "../../../infrastructure/repositories/OtpRepository";
import TokenService from "../../../infrastructure/services/TokenService";
import AuthenticationController from "../../controllers/patient/AuthenticationController";
import AuthPatientUseCase from "../../../use_case/patient/AuthenticationUseCase";

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
const authenticationController = new AuthenticationController(authPatientUseCase);

route.post("/", authenticationController.register.bind(authenticationController));
route.post("/login", authenticationController.login.bind(authenticationController));
route.post("/oauth-signin", authenticationController.oAuthSignin.bind(authenticationController));
route.post("/resend-otp", authenticationController.resendOtp.bind(authenticationController));
route.post("/otp-verification", authenticationController.validateOtp.bind(authenticationController));
route.get("/refresh", authenticationController.refreshAccessToken.bind(authenticationController));
route.post("/forget-password", authenticationController.forgetPassword.bind(authenticationController));
route.patch("/update-password", authenticationController.updatePassword.bind(authenticationController));
route.post("/logout", authenticationController.logout.bind(authenticationController));

export default route;
