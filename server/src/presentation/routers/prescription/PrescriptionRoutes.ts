import express from 'express';
import JWTService from '../../../infrastructure/services/JWTService';
import JoiService from '../../../infrastructure/services/JoiService';
import PrescriptionRepository from '../../../infrastructure/repositories/PrescriptionRepository';
import AppointmentRepository from '../../../infrastructure/repositories/AppointmentRepository';
import CreatePrescriptionUseCase from '../../../use_case/prescription/CreatePrescriptionUseCase';
import PrescriptionController from '../../controllers/prescription/PrescriptionController';
import DoctorAuthMiddleware from '../../middlewares/DoctorAuthMiddleware';

const router = express.Router();

const tokenService = new JWTService();
const validatorService = new JoiService();
const prescriptionRepository = new PrescriptionRepository();
const appointmentRepository = new AppointmentRepository();

const createPrescriptionUseCase = new CreatePrescriptionUseCase(validatorService, prescriptionRepository, appointmentRepository);
const prescriptionController = new PrescriptionController(createPrescriptionUseCase);

const authorizeDoctor = new DoctorAuthMiddleware(tokenService);


router.route("/")
    .post(authorizeDoctor.exec, prescriptionController.createPrescription.bind(prescriptionController))
    .put(authorizeDoctor.exec, prescriptionController.updatePrescription.bind(prescriptionController));

export default router;