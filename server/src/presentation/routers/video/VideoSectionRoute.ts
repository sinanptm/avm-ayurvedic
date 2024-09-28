import { Router } from "express";
import VideoController from "../../../presentation/controllers/video/VideoController";
import GetVideoSectionUseCase from "../../../use_case/video/GetVideoSectionUseCase";
import DoctorAuthMiddleware from "../../middlewares/DoctorAuthMiddleware";
import PatientAuthMiddleware from "../../middlewares/PatientAuthMiddleware";
import JWTService from "../../../infrastructure/services/JWTService";
import VideoSectionRepository from "../../../infrastructure/repositories/VideoSectionRepository";
import JoiService from "../../../infrastructure/services/JoiService";

const router = Router();

const tokenService = new JWTService();
const validatorService = new JoiService;

const videoSectionRepository = new VideoSectionRepository();
const getVideoSectionUseCase = new GetVideoSectionUseCase(videoSectionRepository, validatorService);
const videoController = new VideoController(getVideoSectionUseCase);

const authorizeDoctor = new DoctorAuthMiddleware(tokenService);
const authorizePatient = new PatientAuthMiddleware(tokenService);

router.get("/patient/day", authorizePatient.exec, videoController.getSectionsInOneDayPatient.bind(videoController));
router.get("/patient/:sectionId", authorizePatient.exec, videoController.getSectionById.bind(videoController))

router.use(authorizeDoctor.exec);
router.get("/doctor/day", videoController.getSectionsInOneDayDoctor.bind(videoController));
router.get("/doctor/:sectionId", videoController.getSectionById.bind(videoController));
router.get("/doctor",videoController.getAllSectionsDoctor.bind(videoController));

export default router;
