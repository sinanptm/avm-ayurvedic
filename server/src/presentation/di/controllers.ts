import PrescriptionController from "../controllers/prescription/PrescriptionController";
import AppointmentController from "../controllers/appointment/AppointmentControllers";
import AuthPatientController from "../controllers/patient/AuthenticationController";
import UnauthenticatedControllers from "../controllers/UnauthenticatedControllers";
import AuthDoctorController from "../controllers/doctor/AuthenticationController";
import AdminPatientController from "../controllers/admin/AdminPatientController";
import AuthAdminController from "../controllers/admin/AuthenticationController";
import AdminDoctorController from "../controllers/admin/AdminDoctorController";
import PatientController from "../controllers/patient/PatientController";
import ChatBotController from "../controllers/chatbot/ChatBotController";
import DoctorController from "../controllers/doctor/DoctorController";
import AdminController from "../controllers/admin/AdminController";
import VideoController from "../controllers/video/VideoController";
import SlotController from "../controllers/slot/SlotController";

import createUseCase from "./useCases";

const {
   adminDoctorUseCase,
   adminPatientUseCase,
   authAdminUseCase,
   authDoctorUseCase,
   authPatientUseCase,
   chatBotUseCase,
   createAppointmentUseCase,
   createPrescriptionUseCase,
   createSlotUseCase,
   dashboardUseCase,
   deleteSlotUseCase,
   getAppointmentUseCase,
   getPatientUseCase,
   getSlotUseCase,
   getVideoSectionUseCase,
   patientUseCases,
   unauthenticatedUseCases,
   updateAppointmentUseCase,
   updateSlotUseCase,
} = createUseCase;

const createControllers = () => ({
   adminController: new AdminController(dashboardUseCase),
   adminDoctorController: new AdminDoctorController(adminDoctorUseCase),
   adminPatientController: new AdminPatientController(adminPatientUseCase),
   appointmentController: new AppointmentController(
      createAppointmentUseCase,
      getAppointmentUseCase,
      updateAppointmentUseCase
   ),
   chatBotController: new ChatBotController(chatBotUseCase),
   doctorController: new DoctorController(getPatientUseCase),
   patientController: new PatientController(patientUseCases),
   authDoctorController: new AuthDoctorController(authDoctorUseCase),
   authPatientController: new AuthPatientController(authPatientUseCase),
   prescriptionController: new PrescriptionController(createPrescriptionUseCase),
   slotController: new SlotController(createSlotUseCase, updateSlotUseCase, getSlotUseCase, deleteSlotUseCase),
   videoController: new VideoController(getVideoSectionUseCase),
   unauthenticatedController: new UnauthenticatedControllers(unauthenticatedUseCases),
   authAdminController: new AuthAdminController(authAdminUseCase),
});

export default createControllers();
