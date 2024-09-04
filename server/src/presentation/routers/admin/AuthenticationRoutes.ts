import express from "express";
import AuthenticationController from "../../controllers/admin/AuthenticationController";
import AuthenticationUseCase from "../../../use_case/admin/AuthenticationUseCase";
import DoctorRepository from "../../../infrastructure/repositories/DoctorRepository";
import BcryptService from "../../../infrastructure/services/BcryptService";
import JWTService from "../../../infrastructure/services/JWTService";
import NodeMailerService from "../../../infrastructure/services/NodeMailerService";
import OtpRepository from "../../../infrastructure/repositories/OtpRepository";

const route = express.Router();

const adminRepository = new DoctorRepository();
const otpRepository = new OtpRepository();
const passwordService = new BcryptService();
const tokenService = new JWTService();
const emailService = new NodeMailerService();

const authUseCase = new AuthenticationUseCase(
   adminRepository,
   passwordService,
   tokenService,
   emailService,
   otpRepository
);
const authController = new AuthenticationController(authUseCase);

route.post("/", authController.login.bind(authController));
route.post("/otp-verification", authController.validateOtp.bind(authController));
route.post("/resend-otp", authController.resendOtp.bind(authController));
route.get("/refresh", authController.refreshAccessToken.bind(authController));
route.post("/logout",authController.logout.bind(authController));

export default route;
