import { Router } from "express";
import createControllers from "../../../di/controllers";

const router = Router();
const { patientController } = createControllers;

router.get("/profile", patientController.getProfile.bind(patientController));
router.put("/profile", patientController.updateProfile.bind(patientController));
router.get("/profile/upload-url", patientController.getUploadUrl.bind(patientController));
router.put("/profile/upload-url", patientController.completeProfileImageUpload.bind(patientController));

export default router;
