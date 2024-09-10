import express from "express";
import AuthDoctorController from "../../controllers/doctor/AuthenticationController";
import AuthenticationUseCase from "../../../use_case/doctor/AuthenticationUseCase";
import JWTService from "../../../infrastructure/services/JWTService";
import BcryptService from "../../../infrastructure/services/BcryptService";
import NodeMailerService from "../../../infrastructure/services/NodeMailerService";
import DoctorRepository from "../../../infrastructure/repositories/DoctorRepository";
import OtpRepository from "../../../infrastructure/repositories/OtpRepository";
import S3StorageService from "../../../infrastructure/services/S3StorageService";

const passwordService = new BcryptService();
const tokenService = new JWTService();
const emailService = new NodeMailerService();
const cloudService = new S3StorageService();
const doctorRepository = new DoctorRepository();
const otpRepository = new OtpRepository();

const authUseCase = new AuthenticationUseCase(
   doctorRepository,
   passwordService,
   tokenService,
   emailService,
   otpRepository,
   cloudService
);
const authDoctorController = new AuthDoctorController(authUseCase);

const router = express.Router();

router.post("/", authDoctorController.signup.bind(authDoctorController));
router.post("/signin", authDoctorController.signin.bind(authDoctorController));
router.post("/otp-verification", authDoctorController.validateOtp.bind(authDoctorController));
router.get("/refresh", authDoctorController.refreshAccessToken.bind(authDoctorController));
router.post("/resend-otp", authDoctorController.resendOtp.bind(authDoctorController));
router.post("/upload-url", authDoctorController.uploadProfileImage.bind(authDoctorController));
router.get("/upload-url", authDoctorController.getUploadUrl.bind(authDoctorController));
router.post("/logout", authDoctorController.logout.bind(authDoctorController));

export default router;
