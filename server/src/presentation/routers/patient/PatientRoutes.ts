import express from "express";
import PatientUseCase from "../../../use_case/patient/PatientUseCases";
import PatientRepository from "../../../infrastructure/repositories/PatientRepository";
import PatientController from "../../controllers/PatientController";
import MulterMiddleware from "../../middlewares/MulterMiddleware";

const routes = express.Router();

const patientRepository = new PatientRepository();
const patientUseCase = new PatientUseCase(patientRepository);
const patientController = new PatientController(patientUseCase);
const multerMiddleware = new MulterMiddleware();

routes.get("/profile", patientController.getProfile.bind(patientController));
routes.put("/profile", patientController.updateProfile.bind(patientController));
routes.put("/profile-image", multerMiddleware.single('profile'), patientController.updateProfileImage.bind(patientController));

export default routes;
