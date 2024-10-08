import PrescriptionController from "../presentation/controllers/prescription/PrescriptionController";
import AppointmentController from "../presentation/controllers/appointment/AppointmentControllers";
import AuthPatientController from "../presentation/controllers/patient/AuthenticationController";
import UnauthenticatedControllers from "../presentation/controllers/UnauthenticatedControllers";
import AuthDoctorController from "../presentation/controllers/doctor/AuthenticationController";
import AdminPatientController from "../presentation/controllers/admin/AdminPatientController";
import AuthAdminController from "../presentation/controllers/admin/AuthenticationController";
import AdminDoctorController from "../presentation/controllers/admin/AdminDoctorController";
import PatientController from "../presentation/controllers/patient/PatientController";
import ChatBotController from "../presentation/controllers/chatbot/ChatBotController";
import DoctorController from "../presentation/controllers/doctor/DoctorController";
import AdminController from "../presentation/controllers/admin/AdminController";
import VideoController from "../presentation/controllers/video/VideoController";
import SlotController from "../presentation/controllers/slot/SlotController";

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
   updateSlotUseCase
} = createUseCase;

const createControllers = () => ({
   adminController: new AdminController(dashboardUseCase),
   adminDoctorController: new AdminDoctorController(adminDoctorUseCase),
   adminPatientController: new AdminPatientController(adminPatientUseCase),
   appointmentController: new AppointmentController(createAppointmentUseCase, getAppointmentUseCase, updateAppointmentUseCase),
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
