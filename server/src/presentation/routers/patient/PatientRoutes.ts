import express from "express";
import PatientUseCase from "../../../use_case/patient/PatientUseCases";
import PatientRepository from "../../../infrastructure/repositories/PatientRepository";
import PatientController from "../../controllers/PatientController";

const routes = express();

const patientRepository = new PatientRepository();
const patientUseCase = new PatientUseCase(patientRepository);
const patientController = new PatientController(patientUseCase);

const { addPersonalInformation, getProfile } = patientController;

routes.get("/profile", getProfile);
routes.put("/personal-information", addPersonalInformation);

export default routes;
