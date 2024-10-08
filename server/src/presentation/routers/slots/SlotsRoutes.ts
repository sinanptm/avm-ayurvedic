import express from "express";
import { authorizeDoctor } from "../../di/middlewares";
import createControllers from "../../di/controllers";


const router = express.Router();
const { slotController } = createControllers;


router.post("/day", authorizeDoctor.exec, slotController.createManyByDay.bind(slotController));
router.delete("/day", authorizeDoctor.exec, slotController.deleteManyByDay.bind(slotController));
router.post("/all-days", authorizeDoctor.exec, slotController.createForAllDays.bind(slotController));
router.delete("/all-days", authorizeDoctor.exec, slotController.deleteForAllDays.bind(slotController));
router.get("/doctor", authorizeDoctor.exec, slotController.getAllDoctorSlots.bind(slotController));
router.get("/:doctorId", slotController.getAllSlotsByDoctorId.bind(slotController));

export default router;
