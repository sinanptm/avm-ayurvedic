import express from "express";
import SlotRepository from "../../../infrastructure/repositories/SlotRepository";
import SlotController from "../../controllers/slot/SlotController";
import DoctorAuthMiddleware from "../../middlewares/DoctorAuthMiddleware";
import TokenService from "../../../infrastructure/services/JWTService";
import AppointmentRepository from "../../../infrastructure/repositories/AppointmentRepository";
import JoiService from "../../../infrastructure/services/JoiService";
import CreateSlotUseCase from "../../../use_case/slot/CreateSlotUseCase";
import DeleteSlotUseCase from "../../../use_case/slot/DeleteSlotUseCase";
import GetSlotUseCase from "../../../use_case/slot/GetSlotUseCase";
import UpdateSlotUseCase from "../../../use_case/slot/UpdateSlotUseCase";

const router = express.Router();

const slotRepository = new SlotRepository();
const tokenService = new TokenService();
const authorizeDoctor = new DoctorAuthMiddleware(tokenService);
const appointmentRepository = new AppointmentRepository();
const validatorService = new JoiService();

const createSlotUseCase = new CreateSlotUseCase(slotRepository, validatorService);
const deleteSlotUseCase = new DeleteSlotUseCase(slotRepository, appointmentRepository, validatorService);
const getSlotUseCase = new GetSlotUseCase(slotRepository, appointmentRepository, validatorService);
const updateSlotUseCase = new UpdateSlotUseCase(slotRepository, validatorService);

const slotController = new SlotController(createSlotUseCase, updateSlotUseCase, getSlotUseCase, deleteSlotUseCase);

router.post("/day", authorizeDoctor.exec, slotController.createManyByDay.bind(slotController));
router.delete("/day", authorizeDoctor.exec, slotController.deleteManyByDay.bind(slotController));
router.post("/all-days", authorizeDoctor.exec, slotController.createForAllDays.bind(slotController));
router.delete("/all-days", authorizeDoctor.exec, slotController.deleteForAllDays.bind(slotController));
router.get("/doctor", authorizeDoctor.exec, slotController.getAllDoctorSlots.bind(slotController));
router.get("/:doctorId", slotController.getAllSlotsByDoctorId.bind(slotController));

export default router;
