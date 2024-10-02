import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import INotificationRepository from "../../domain/interface/repositories/INotificationRepository";
import IValidatorService from "../../domain/interface/services/IValidatorService";
import { AppointmentStatus } from "../../domain/entities/IAppointment";
import { NotificationTypes } from "../../domain/entities/INotification";
import IVideoSectionRepository from "../../domain/interface/repositories/IVideoSectionRepository";
import { VideoSectionStatus } from "../../domain/entities/IVideoChatSection";

export default class UpdateAppointmentUseCase {
   constructor(
      private appointmentRepository: IAppointmentRepository,
      private validatorService: IValidatorService,
      private notificationRepository: INotificationRepository,
      private videoSectionRepository: IVideoSectionRepository
   ) { }

   // By Doctor
   async updateStatus(appointmentId: string, status: AppointmentStatus): Promise<void> {
      this.validatorService.validateRequiredFields({ appointmentId, status });
      this.validatorService.validateIdFormat(appointmentId);
      this.validatorService.validateEnum(status, Object.values(AppointmentStatus));
      const appointment = await this.appointmentRepository.update(appointmentId, { status });
      // notify patient
      if (status === AppointmentStatus.CANCELLED && appointment) {
         await this.notificationRepository.create({
            appointmentId,
            message: `🚫 Your appointment has been canceled. If you have any questions, please contact your doctor.`,
            patientId: appointment.patientId,
            type: NotificationTypes.APPOINTMENT_CANCELED
         });
         await this.videoSectionRepository.findByAppointmentIdAndUpdate(appointmentId, { status: VideoSectionStatus.CANCELLED });
      }
      
      if (status === AppointmentStatus.CONFIRMED && appointment) {
         await this.notificationRepository.create({
            appointmentId,
            message: `✅ Your appointment has been accepted! Please make sure to be available at the scheduled time.`,
            patientId: appointment.patientId,
            type: NotificationTypes.APPOINTMENT_CONFIRMED
         });
      }      
   
   }

   // By Patient 
   async updateStatusAndNote(appointmentId: string, status: AppointmentStatus, notes: string): Promise<void> {
      this.validatorService.validateRequiredFields({ appointmentId, status, notes });
      this.validatorService.validateEnum(status, Object.values(AppointmentStatus));
      const appointment = await this.appointmentRepository.update(appointmentId, { status, notes });
      // notify doctor
      if (status === AppointmentStatus.CANCELLED && appointment) {
         await this.notificationRepository.create({
            appointmentId,
            message: `🚫 The appointment for patient has been canceled. The slot is now available for other patients.`,
            doctorId: appointment.doctorId,
            type: NotificationTypes.APPOINTMENT_CANCELED
         });
      }
   }
}
