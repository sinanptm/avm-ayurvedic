import express from "express";
import BcryptService from "../../../infrastructure/services/BcryptService";
import NodeMailerService from "../../../infrastructure/services/NodeMailerService";
import JWTService from "../../../infrastructure/services/JWTService";
import PatientRepository from "../../../infrastructure/repositories/PatientRepository";
import OtpRepository from "../../../infrastructure/repositories/OtpRepository";
import AuthenticationController from "../../controllers/patient/AuthenticationController";
import AuthPatientUseCase from "../../../use_case/patient/AuthenticationUseCase";

const route = express.Router();

// Services and Repositories
const tokenService = new JWTService();
const passwordService = new BcryptService();
const emailService = new NodeMailerService();
const patientRepository = new PatientRepository();
const otpRepository = new OtpRepository();

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
