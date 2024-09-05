import express from 'express'
import AdminPatientController from '../../controllers/admin/PatientController';
import AdminPatientUseCase from '../../../use_case/admin/PatientUseCase';
import PatientRepository from '../../../infrastructure/repositories/PatientRepository';

const route = express.Router();

const patientRepository = new PatientRepository()
const adminPatientUseCase = new AdminPatientUseCase(patientRepository)
const adminPatientController = new AdminPatientController(adminPatientUseCase);

route.get("/patient",adminPatientController.getPatients.bind(adminPatientController));


export default route