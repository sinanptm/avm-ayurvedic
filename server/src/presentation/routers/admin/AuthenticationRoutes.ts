import { Router } from "express";
import AuthenticationController from "../../controllers/admin/AuthenticationController";
import NodeMailerService from "../../../infrastructure/services/NodeMailerService";
import DoctorRepository from "../../../infrastructure/repositories/DoctorRepository";
import AuthenticationUseCase from "../../../use_case/admin/AuthenticationUseCase";
import OtpRepository from "../../../infrastructure/repositories/OtpRepository";
import BcryptService from "../../../infrastructure/services/BcryptService";
import JWTService from "../../../infrastructure/services/JWTService";
import JoiService from "../../../infrastructure/services/JoiService";

const router = Router();

const adminRepository = new DoctorRepository();
const otpRepository = new OtpRepository();
const passwordService = new BcryptService();
const tokenService = new JWTService();
const emailService = new NodeMailerService();
const validatorService = new JoiService();

const authUseCase = new AuthenticationUseCase(
   adminRepository,
   passwordService,
   tokenService,
   emailService,
   otpRepository,
   validatorService
);
const authController = new AuthenticationController(authUseCase);

router.post("/", authController.login.bind(authController));
router.post("/otp-verification", authController.validateOtp.bind(authController));
router.post("/resend-otp", authController.resendOtp.bind(authController));
router.get("/refresh", authController.refreshAccessToken.bind(authController));
router.post("/logout", authController.logout.bind(authController));

export default router;
