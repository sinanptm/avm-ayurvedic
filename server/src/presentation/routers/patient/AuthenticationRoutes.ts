import { Router } from "express";
import AuthenticationController from "../../controllers/patient/AuthenticationController";
import PatientRepository from "../../../infrastructure/repositories/PatientRepository";
import NodeMailerService from "../../../infrastructure/services/NodeMailerService";
import AuthPatientUseCase from "../../../use_case/patient/AuthenticationUseCase";
import OtpRepository from "../../../infrastructure/repositories/OtpRepository";
import BcryptService from "../../../infrastructure/services/BcryptService";
import JWTService from "../../../infrastructure/services/JWTService";
import JoiService from "../../../infrastructure/services/JoiService";

const router = Router();

const tokenService = new JWTService();
const passwordService = new BcryptService();
const emailService = new NodeMailerService();
const validatorService = new JoiService();
const patientRepository = new PatientRepository();
const otpRepository = new OtpRepository();

const authPatientUseCase = new AuthPatientUseCase(
   patientRepository,
   passwordService,
   emailService,
   otpRepository,
   tokenService,
   validatorService
);
const authenticationController = new AuthenticationController(authPatientUseCase);

router.post("/", authenticationController.register.bind(authenticationController));
router.post("/login", authenticationController.login.bind(authenticationController));
router.post("/oauth-signin", authenticationController.oAuthSignin.bind(authenticationController));
router.post("/resend-otp", authenticationController.resendOtp.bind(authenticationController));
router.post("/otp-verification", authenticationController.validateOtp.bind(authenticationController));
router.get("/refresh", authenticationController.refreshAccessToken.bind(authenticationController));
router.post("/forget-password", authenticationController.forgetPassword.bind(authenticationController));
router.patch("/update-password", authenticationController.updatePassword.bind(authenticationController));
router.post("/logout", authenticationController.logout.bind(authenticationController));

export default router;
