import { Router } from "express";
import createControllers from "../../../di/controllers";

const router = Router();

const { adminController, adminPatientController, adminDoctorController } = createControllers;

router.get('/patient-gender', adminController.getGenderStatistics.bind(adminController));
router.get('/users-months', adminController.getUsersStatistics.bind(adminController));
router.get('/appointment-status', adminController.getAppointmentsStatisticsByStatus.bind(adminController));
router.get('/appointment-month', adminController.getAppointmentsPerMonthStatistics.bind(adminController));
router.get('/slot-usage', adminController.getSlotUsageStatistics.bind(adminController));
router
   .route("/patient")
   .get(adminPatientController.getPatients.bind(adminPatientController))
   .put(adminPatientController.updatePatient.bind(adminPatientController));
router
   .route("/doctor")
   .get(adminDoctorController.getDoctors.bind(adminDoctorController))
   .put(adminDoctorController.updateDoctor.bind(adminDoctorController));


export default router;