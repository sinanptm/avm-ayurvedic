import { Router } from "express";
import AdminPatientController from "../../controllers/admin/PatientController";
import AdminPatientUseCase from "../../../use_case/admin/PatientUseCase";
import PatientRepository from "../../../infrastructure/repositories/PatientRepository";

import AdminDoctorController from "../../controllers/admin/DoctorController";
import AdminDoctorUseCase from "../../../use_case/admin/DoctorUseCase";
import DoctorRepository from "../../../infrastructure/repositories/DoctorRepository";
import NodeMailerService from "../../../infrastructure/services/NodeMailerService";
import JoiService from "../../../infrastructure/services/JoiService";

const router = Router();

const patientRepository = new PatientRepository();
const doctorRepository = new DoctorRepository();
const emailService = new NodeMailerService();
const validatorService = new JoiService();
const adminPatientUseCase = new AdminPatientUseCase(patientRepository, validatorService);
const adminPatientController = new AdminPatientController(adminPatientUseCase);

const adminDoctorUseCase = new AdminDoctorUseCase(doctorRepository, emailService, validatorService);
const adminDoctorController = new AdminDoctorController(adminDoctorUseCase);

router
   .route("/patient")
   .get(adminPatientController.getPatients)
   .put(adminPatientController.updatePatient);
router
   .route("/doctor")
   .get(adminDoctorController.getDoctors)
   .put(adminDoctorController.updateDoctor);

export default router;
