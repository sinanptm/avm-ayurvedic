import { Router } from "express";
import createControllers from "../../../di/controllers";
import { authorizeDoctor, authorizePatient } from "../../../di/middlewares";


const router = Router();
const { appointmentController } = createControllers;


router.get("/patient/details/:appointmentId", authorizePatient.exec, appointmentController.getAppointmentDetails.bind(appointmentController));
router.get("/patient/succuss/:paymentId", authorizePatient.exec, appointmentController.getAppointmentSuccussDetails.bind(appointmentController));
router.post("/patient/", authorizePatient.exec, appointmentController.create.bind(appointmentController));
router.get("/patient/", authorizePatient.exec, appointmentController.getAppointmentsPatient.bind(appointmentController));
router.put("/patient/", authorizePatient.exec, appointmentController.updateStatusAndNotes.bind(appointmentController));

router.get("/doctor/details/:appointmentId", authorizeDoctor.exec, appointmentController.getAppointmentDetails.bind(appointmentController));
router.get("/doctor", authorizeDoctor.exec, appointmentController.getAppointmentsDoctor.bind(appointmentController));
router.put("/doctor/", authorizeDoctor.exec, appointmentController.updateAppointment.bind(appointmentController));


export default router;

export const webhook = appointmentController.handleStripeWebhook.bind(appointmentController);
