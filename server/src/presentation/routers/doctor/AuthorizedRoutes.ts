import { Router } from 'express';
import AppointmentRepository from '../../../infrastructure/repositories/AppointmentRepository';
import GetPatientUseCaseDoctor from '../../../use_case/doctor/GetPatientUseCase';
import DoctorController from '../../controllers/doctor/DoctorController';
import JoiService from '../../../infrastructure/services/JoiService';

const router = Router();

const appointmentRepository = new AppointmentRepository();
const validatorService = new JoiService()

const doctorUseCase = new GetPatientUseCaseDoctor(appointmentRepository, validatorService)
const doctorController = new DoctorController(doctorUseCase)

router.get("/", doctorController.getPatients.bind(doctorController));
router.get("/medical-history/:patientId", doctorController.getMedicalHistory.bind(doctorController))


export default router;