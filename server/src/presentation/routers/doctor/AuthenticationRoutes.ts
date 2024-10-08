import express from "express";
import createControllers from "../../di/controllers";

const router = express.Router();
const { authDoctorController } = createControllers;

router.get("/refresh", authDoctorController.refreshAccessToken.bind(authDoctorController));
router.post("/logout", authDoctorController.logout.bind(authDoctorController));
router.post("/signin", authDoctorController.signin.bind(authDoctorController));
router.post("/otp-verification", authDoctorController.validateOtp.bind(authDoctorController));
router.post("/forgot-password", authDoctorController.forgotPassword.bind(authDoctorController));
router.patch("/update-password", authDoctorController.updatePassword.bind(authDoctorController));
router.post("/resend-otp", authDoctorController.resendOtp.bind(authDoctorController));
router.post("/upload-url", authDoctorController.uploadProfileImage.bind(authDoctorController));
router.get("/upload-url", authDoctorController.getUploadUrl.bind(authDoctorController));
router.post("/", authDoctorController.signup.bind(authDoctorController));

export default router;
