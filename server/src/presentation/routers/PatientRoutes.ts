import express from "express";
import PatientRepository from "../../infrastructure/database/repositories/PatientRepository";
import PasswordService from "../../infrastructure/services/PasswordService";
import PatientUseCase from "../../use_case/patient/UpdatePatientUseCase";
import RegisterPatientUseCase from "../../use_case/patient/RegisterPatientUseCase";
import PatientController from "../controllers/PatientController";
import LoginPatientUseCase from "../../use_case/patient/LoginPatientUseCase";

const route = express();

const patientRepository = new PatientRepository();
const passwordService = new PasswordService();
const patientUseCase = new PatientUseCase(patientRepository);
const loginPatientUseCase = new LoginPatientUseCase(patientRepository, passwordService);
const registerPatientUseCase = new RegisterPatientUseCase(patientRepository, passwordService);
const patientController = new PatientController(patientUseCase, registerPatientUseCase, loginPatientUseCase);

route.post("/register", (req, res, next) => {
   patientController.registerPatient(req, res, next);
});

route.post("/login", (req, res, next) => {
   patientController.loginPatient(req, res, next);
});

export default route;