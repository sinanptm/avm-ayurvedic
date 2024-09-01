import express from "express";
import PatientRepository from "../../../infrastructure/repositories/PatientRepository";
import PasswordService from "../../../infrastructure/services/PasswordService";
import AuthPatientController from "../../controllers/AuthPatientController";
import AuthPatientUseCase from "../../../use_case/patient/AuthPatientUseCase";
import EmailService from "../../../infrastructure/services/EmailService";
import OtpRepository from "../../../infrastructure/repositories/OtpRepository";
import TokenService from "../../../infrastructure/services/TokenService";
import PatientAuthMiddleware from "../../middlewares/PatientAuthMiddleware";

const route = express.Router();

// Services and Repositories
const emailService = new EmailService();
const tokenService = new TokenService();
const otpRepository = new OtpRepository();
const passwordService = new PasswordService();
const patientRepository = new PatientRepository();

// Use Cases
const authPatientUseCase = new AuthPatientUseCase(
   patientRepository,
   passwordService,
   emailService,
   otpRepository,
   tokenService
);

// Controllers
const authPatientController = new AuthPatientController(authPatientUseCase);

// Middleware
const patientAuthMiddleware = new PatientAuthMiddleware(tokenService);

route.post("/register", (req, res, next) => {
   authPatientController.register(req, res, next);
});
route.post("/login", (req, res, next) => {
   authPatientController.login(req, res, next);
});
route.post("/oauth-signin",(req,res,next)=>{
   authPatientController.oAuthSignin(req,res,next);
})
route.post("/resend-otp", (req, res, next) => {
   authPatientController.resendOtp(req, res, next);
});
route.post("/otp-verification", (req, res, next) => {
   authPatientController.validateOtp(req, res, next);
});
route.get("/refresh", (req, res, next) => {
   authPatientController.refreshAccessToken(req, res, next);
});
route.post("/forget-password", (req, res, next) => {
   authPatientController.forgetPassword(req, res, next);
});
route.patch("/update-password", (req, res, next) => {
   authPatientController.updatePassword(req, res, next);
});
route.post("/logout", patientAuthMiddleware.exec, (req, res, next) => {
   authPatientController.logout(req, res, next);
});

export default route;
