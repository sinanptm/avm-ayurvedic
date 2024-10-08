import { Router } from "express";
import createControllers from "../../../di/controllers";

const router = Router();

const { authAdminController } = createControllers

router.post("/", authAdminController.login.bind(authAdminController));
router.post("/otp-verification", authAdminController.validateOtp.bind(authAdminController));
router.post("/resend-otp", authAdminController.resendOtp.bind(authAdminController));
router.get("/refresh", authAdminController.refreshAccessToken.bind(authAdminController));
router.post("/logout", authAdminController.logout.bind(authAdminController));

export default router;
