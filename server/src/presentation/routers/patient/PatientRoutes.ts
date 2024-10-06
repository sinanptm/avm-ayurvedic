import { Router } from "express";
import PatientUseCase from "../../../use_case/patient/PatientUseCases";
import PatientRepository from "../../../infrastructure/repositories/PatientRepository";
import PatientController from "../../controllers/patient/PatientController";
import S3StorageService from "../../../infrastructure/services/S3StorageService";
import JoiService from "../../../infrastructure/services/JoiService";
import ChatRepository from "../../../infrastructure/repositories/ChatRepository";
import VideoSectionRepository from "../../../infrastructure/repositories/VideoSectionRepository";

const router = Router();

const patientRepository = new PatientRepository();
const chatRepository = new ChatRepository();
const videoSectionRepository = new VideoSectionRepository();

const s3StorageService = new S3StorageService();
const validatorService = new JoiService();

const patientUseCase = new PatientUseCase(
    patientRepository, s3StorageService, validatorService, chatRepository, videoSectionRepository
);
const patientController = new PatientController(patientUseCase);

router.get("/profile", patientController.getProfile.bind(patientController));
router.put("/profile", patientController.updateProfile.bind(patientController));
router.get("/profile/upload-url", patientController.getUploadUrl.bind(patientController));
router.put("/profile/upload-url", patientController.completeProfileImageUpload.bind(patientController));

export default router;
