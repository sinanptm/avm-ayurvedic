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

router.get("/patient", adminPatientController.getPatients.bind(adminPatientController));
router.patch("/patient", adminPatientController.updatePatient.bind(adminPatientController));
router.post("/doctor",adminDoctorController.create.bind(adminDoctorController));

export default router;
