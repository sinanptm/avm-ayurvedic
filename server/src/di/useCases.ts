import CreatePrescriptionUseCase from "../use_case/prescription/CreatePrescriptionUseCase";
import CreateAppointmentUseCase from "../use_case/appointment/CreateAppointmentUseCase";
import UpdateAppointmentUseCase from "../use_case/appointment/UpdateAppointmentUseCase";
import PatientAuthenticationUseCase from "../use_case/patient/AuthenticationUseCase";
import DoctorAuthenticationUseCase from "../use_case/doctor/AuthenticationUseCase";
import GetAppointmentUseCase from "../use_case/appointment/GetAppointmentUseCase";
import NotificationUseCase from "../use_case/notification/NotificationUseCase";
import GetVideoSectionUseCase from "../use_case/video/GetVideoSectionUseCase";
import AuthenticationUseCase from "../use_case/admin/AuthenticationUseCase";
import UnauthenticatedUseCases from "../use_case/UnauthenticatedUseCases";
import AdminPatientUseCase from "../use_case/admin/AdminPatientUseCase";
import AdminDoctorUseCase from "../use_case/admin/AdminDoctorUseCase";
import GetPatientUseCase from "../use_case/doctor/GetPatientUseCase";
import CreateSlotUseCase from "../use_case/slot/CreateSlotUseCase";
import CreateChatUseCase from "../use_case/chat/CreateChatUseCase";
import DeleteSlotUseCase from "../use_case/slot/DeleteSlotUseCase";
import UpdateSlotUseCase from "../use_case/slot/UpdateSlotUseCase";
import DashboardUseCase from "../use_case/admin/DashboardUseCase";
import PatientUseCases from "../use_case/patient/PatientUseCases";
import ChatBotUseCase from "../use_case/chatbot/ChatBotUseCase";
import GetChatUseCase from "../use_case/chat/GetChatUseCase";
import GetSlotUseCase from "../use_case/slot/GetSlotUseCase";

import {
   appointmentRepository,
   chatBotMessageRepository,
   chatRepository,
   doctorRepository,
   messageRepository,
   notificationRepository,
   otpRepository,
   patientRepository,
   paymentRepository,
   prescriptionRepository,
   slotRepository,
   videoSectionRepository,
} from "./repositories";

import {
   bcryptService,
   geminiBotService,
   joiService,
   jwtService,
   nodeMailerService,
   s3StorageService,
   stripeService,
   uuidService,
} from "./services";


const createUseCases = () => ({
   authAdminUseCase: new AuthenticationUseCase(
      doctorRepository,
      bcryptService,
      jwtService,
      nodeMailerService,
      otpRepository,
      joiService
   ),
   dashboardUseCase: new DashboardUseCase(
      patientRepository,
      appointmentRepository,
      doctorRepository,
      slotRepository
   ),
   adminPatientUseCase: new AdminPatientUseCase(patientRepository, joiService),
   adminDoctorUseCase: new AdminDoctorUseCase(doctorRepository, nodeMailerService, joiService),
   createAppointmentUseCase: new CreateAppointmentUseCase(
      appointmentRepository,
      slotRepository,
      joiService,
      stripeService,
      paymentRepository,
      videoSectionRepository,
      doctorRepository,
      patientRepository,
      uuidService
   ),
   updateAppointmentUseCase: new UpdateAppointmentUseCase(
      appointmentRepository,
      joiService,
      notificationRepository,
      videoSectionRepository,
      stripeService,
      paymentRepository
   ),
   getAppointmentUseCase: new GetAppointmentUseCase(
      appointmentRepository,
      joiService,
      paymentRepository,
      prescriptionRepository
   ),
   createChatUseCase: new CreateChatUseCase(
      messageRepository,
      chatRepository,
      joiService,
      patientRepository,
      doctorRepository
   ),
   getChatUseCase: new GetChatUseCase(messageRepository, chatRepository, joiService, patientRepository),
   chatBotUseCase: new ChatBotUseCase(chatBotMessageRepository, geminiBotService, joiService),
   authDoctorUseCase: new DoctorAuthenticationUseCase(
      doctorRepository,
      bcryptService,
      jwtService,
      nodeMailerService,
      otpRepository,
      s3StorageService,
      joiService
   ),
   getPatientUseCase: new GetPatientUseCase(appointmentRepository, joiService),
   notificationUseCase: new NotificationUseCase(notificationRepository, joiService),
   authPatientUseCase: new PatientAuthenticationUseCase(
      patientRepository,
      bcryptService,
      nodeMailerService,
      otpRepository,
      jwtService,
      joiService
   ),
   patientUseCases: new PatientUseCases(
      patientRepository,
      s3StorageService,
      joiService,
      chatRepository,
      videoSectionRepository
   ),
   createPrescriptionUseCase: new CreatePrescriptionUseCase(
      joiService,
      prescriptionRepository,
      appointmentRepository
   ),
   createSlotUseCase: new CreateSlotUseCase(slotRepository, joiService),
   deleteSlotUseCase: new DeleteSlotUseCase(
      slotRepository,
      appointmentRepository,
      joiService,
      notificationRepository
   ),
   getSlotUseCase: new GetSlotUseCase(slotRepository, appointmentRepository, joiService),
   updateSlotUseCase: new UpdateSlotUseCase(slotRepository, joiService),
   getVideoSectionUseCase: new GetVideoSectionUseCase(videoSectionRepository, joiService, appointmentRepository),
   unauthenticatedUseCases: new UnauthenticatedUseCases(doctorRepository),
});

export default createUseCases();
