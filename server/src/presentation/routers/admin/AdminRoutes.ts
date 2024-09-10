import express from "express";
import AdminPatientController from "../../controllers/admin/PatientController";
import AdminPatientUseCase from "../../../use_case/admin/PatientUseCase";
import PatientRepository from "../../../infrastructure/repositories/PatientRepository";

import AdminDoctorController from "../../controllers/admin/DoctorController";
import AdminDoctorUseCase from "../../../use_case/admin/DoctorUseCase";
import DoctorRepository from "../../../infrastructure/repositories/DoctorRepository";

const router = express.Router();

const patientRepository = new PatientRepository();
const doctorRepository = new DoctorRepository();
const adminPatientUseCase = new AdminPatientUseCase(patientRepository);
const adminPatientController = new AdminPatientController(adminPatientUseCase);
const adminDoctorUseCase = new AdminDoctorUseCase(doctorRepository);
const adminDoctorController = new AdminDoctorController(adminDoctorUseCase);

router
   .route("/patient")
   .get(adminPatientController.getPatients.bind(adminPatientController))
   .put(adminPatientController.updatePatient.bind(adminPatientController));
router
   .route("/doctor")
   .get(adminDoctorController.getDoctors.bind(adminDoctorController))
   .put(adminDoctorController.updateDoctor.bind(adminDoctorController));

export default router;
