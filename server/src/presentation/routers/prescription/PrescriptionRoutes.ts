import express from "express";
import createControllers from "../../di/controllers";
import { authorizeDoctor } from "../../di/middlewares";

const router = express.Router();
const { prescriptionController } = createControllers;

router
   .route("/")
   .post(authorizeDoctor.exec, prescriptionController.createPrescription.bind(prescriptionController))
   .put(authorizeDoctor.exec, prescriptionController.updatePrescription.bind(prescriptionController));

export default router;
