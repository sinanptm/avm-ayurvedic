import { Router } from 'express';
import DoctorController from '../../controllers/doctor/DoctorController';
import AppointmentRepository from '../../../infrastructure/repositories/AppointmentRepository';
import GetPatientUseCaseDoctor from '../../../use_case/doctor/GetPatientUseCase';

const router = Router();

const appointmentRepository = new AppointmentRepository();

const doctorUseCase = new GetPatientUseCaseDoctor(appointmentRepository)
const doctorController = new DoctorController(doctorUseCase)

router.get("/",doctorController.getPatients.bind(doctorController));


export default router;