import express from "express";
import PatientUseCase from "../../../use_case/patient/PatientUseCases";
import PatientRepository from "../../../infrastructure/repositories/PatientRepository";
import PatientController from "../../controllers/PatientController";

const patientRoutes = express();

const patientRepository = new PatientRepository();

const patientUseCase = new PatientUseCase(patientRepository);

const patientController = new PatientController(patientUseCase);

patientRoutes.get("/profile", (req, res, next) => {
   patientController.getProfile(req,res,next);
});

export default patientRoutes;
