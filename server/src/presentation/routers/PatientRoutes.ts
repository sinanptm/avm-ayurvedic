import express from "express";
import PatientRepository from "../../infrastructure/database/repositories/PatientRepository";
import PasswordService from "../../infrastructure/services/PasswordService";
import PatientUseCase from "../../use_case/patient/UpdatePatientUseCase";
import RegisterPatientUseCase from "../../use_case/patient/RegisterPatientUseCase";
import PatientController from "../controllers/PatientController";
import LoginPatientUseCase from "../../use_case/patient/LoginPatientUseCase";
import EmailService from "../../infrastructure/services/EmailService";
import OtpRepository from "../../infrastructure/database/repositories/OtpRepository";

const route = express();

const emailService = new EmailService();
const otpRepository = new OtpRepository();
const passwordService = new PasswordService();
const patientRepository = new PatientRepository();
const patientUseCase = new PatientUseCase(patientRepository);
const registerPatientUseCase = new RegisterPatientUseCase(patientRepository, passwordService);
const loginPatientUseCase = new LoginPatientUseCase(patientRepository, passwordService, emailService, otpRepository);
const patientController = new PatientController(patientUseCase, registerPatientUseCase, loginPatientUseCase);

route.post("/", (req, res, next) => {
   patientController.register(req, res, next);
});

route.post("/login", (req, res, next) => {
   patientController.login(req, res, next);
});

route.post("/otp-verification", (req, res, next) => {
   patientController.validateOtp(req, res, next);
});

export default route;
