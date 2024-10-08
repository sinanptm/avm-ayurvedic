import { Router } from "express";
import { authorizeDoctor, authorizePatient } from "../../../di/middlewares";
import createControllers from "../../../di/controllers";


const router = Router();
const { videoController } = createControllers;

router.get("/patient/day", authorizePatient.exec, videoController.getSectionsInOneDayPatient.bind(videoController));
router.get("/patient/:sectionId", authorizePatient.exec, videoController.getSectionById.bind(videoController));

router.use(authorizeDoctor.exec);
router.get("/doctor/day", videoController.getSectionsInOneDayDoctor.bind(videoController));
router.get("/doctor/:sectionId", videoController.getSectionById.bind(videoController));
router.get("/doctor", videoController.getAllSectionsDoctor.bind(videoController));

export default router;
