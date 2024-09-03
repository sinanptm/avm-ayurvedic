import express from "express";
import PatientUseCase from "../../../use_case/patient/PatientUseCases";
import PatientRepository from "../../../infrastructure/repositories/PatientRepository";
import PatientController from "../../controllers/patient/PatientController";
import MulterMiddleware from "../../middlewares/MulterMiddleware";
import ImageService from "../../../infrastructure/services/ImageService";

const router = express.Router();

const patientRepository = new PatientRepository();
const imageService = new ImageService();
const patientUseCase = new PatientUseCase(patientRepository, imageService);
const patientController = new PatientController(patientUseCase);
const multerMiddleware = new MulterMiddleware();

router.get("/profile", patientController.getProfile.bind(patientController));
router.put("/profile", patientController.updateProfile.bind(patientController));
router.get('/profile/upload-url', patientController.getUploadUrl.bind(patientController));
router.put("/profile/upload-url",patientController.completeProfileImageUpload.bind(patientController));

export default router;
