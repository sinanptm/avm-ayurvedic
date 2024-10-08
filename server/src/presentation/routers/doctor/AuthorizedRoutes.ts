import { Router } from 'express';
import createControllers from "../../../di/controllers";


const router = Router();
const { doctorController } = createControllers;

router.get("/", doctorController.getPatients.bind(doctorController));
router.get("/medical-history/:patientId", doctorController.getMedicalHistory.bind(doctorController));


export default router;