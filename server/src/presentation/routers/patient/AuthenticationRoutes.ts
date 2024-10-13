import { Router } from "express";
import createControllers from "../../di/controllers";

const router = Router();
const { authPatientController } = createControllers;

router.post("/", authPatientController.register.bind(authPatientController));
router.post("/login", authPatientController.login.bind(authPatientController));
router.post("/oauth-signin", authPatientController.oAuthSignin.bind(authPatientController));
router.post("/resend-otp", authPatientController.resendOtp.bind(authPatientController));
router.post("/otp-verification", authPatientController.validateOtp.bind(authPatientController));
router.get("/refresh", authPatientController.refreshAccessToken.bind(authPatientController));
router.post("/forget-password", authPatientController.forgetPassword.bind(authPatientController));
router.patch("/update-password", authPatientController.updatePassword.bind(authPatientController));
router.post("/logout", authPatientController.logout.bind(authPatientController));

export default router;
