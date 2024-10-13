import IVideoSectionRepository from "../../domain/interface/repositories/IVideoSectionRepository";
import INotificationRepository from "../../domain/interface/repositories/INotificationRepository";
import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import IPaymentRepository from "../../domain/interface/repositories/IPaymentRepository";
import IValidatorService from "../../domain/interface/services/IValidatorService";
import IPaymentService from "../../domain/interface/services/IPaymentService";
import { VideoSectionStatus } from "../../domain/entities/IVideoChatSection";
import { NotificationTypes } from "../../domain/entities/INotification";
import { AppointmentStatus } from "../../domain/entities/IAppointment";
import { format } from "../../utils/date-formatter";

export default class UpdateAppointmentUseCase {
   constructor(
      private appointmentRepository: IAppointmentRepository,
      private validatorService: IValidatorService,
      private notificationRepository: INotificationRepository,
      private videoSectionRepository: IVideoSectionRepository,
      private paymentService: IPaymentService,
      private paymentRepository: IPaymentRepository
   ) {}

   // By Doctor
   async updateStatus(appointmentId: string, status: AppointmentStatus): Promise<void> {
      this.validatorService.validateRequiredFields({ appointmentId, status });
      this.validatorService.validateIdFormat(appointmentId);
      this.validatorService.validateEnum(status, Object.values(AppointmentStatus));
      const appointment = await this.appointmentRepository.update(appointmentId, { status });

      if (status === AppointmentStatus.CANCELLED && appointment) {
         await this.handleCancellation(appointmentId, appointment);
      }

      if (status === AppointmentStatus.CONFIRMED && appointment) {
         await this.notificationRepository.create({
            appointmentId,
            message: `✅ Your appointment has been accepted! Please make sure to be available at the scheduled time.`,
            patientId: appointment.patientId,
            type: NotificationTypes.APPOINTMENT_CONFIRMED,
         });
      }
   }

   // By Patient
   async updateStatusAndNote(appointmentId: string, status: AppointmentStatus, notes: string): Promise<void> {
      this.validatorService.validateRequiredFields({ appointmentId, status, notes });
      this.validatorService.validateEnum(status, Object.values(AppointmentStatus));
      const appointment = await this.appointmentRepository.update(appointmentId, { status, notes });

      if (status === AppointmentStatus.CANCELLED && appointment) {
         await this.handleCancellation(appointmentId, appointment, true);
      }
   }

   // Handle appointment cancellation
   private async handleCancellation(appointmentId: string, appointment: any, notifyDoctor: boolean = false) {
      await this.notificationRepository.create({
         appointmentId,
         message: `🚫 Your appointment has been canceled. Your refund will be credited to your account in 10 working days. If you have any questions, please contact your doctor.`,
         patientId: appointment.patientId,
         type: NotificationTypes.APPOINTMENT_CANCELED,
      });

      await this.videoSectionRepository.findByAppointmentIdAndUpdate(appointmentId, {
         status: VideoSectionStatus.CANCELLED,
      });

      const payment = await this.paymentRepository.findByAppointmentId(appointment._id!);
      if (payment) {
         await this.paymentService.refundPayment(payment.paymentId!, payment.amount);
      }

      if (notifyDoctor) {
         await this.notificationRepository.create({
            appointmentId,
            message: `🚫 The appointment for patient has been canceled. The slot is now available for other patients.`,
            doctorId: appointment.doctorId,
            type: NotificationTypes.APPOINTMENT_CANCELED,
         });
      }
   }

   async updateCompleteSection(roomId: string, doctorId: string) {
      const room = await this.videoSectionRepository.findByRoomId(roomId);
      if (!room) {
         throw new Error("Invalid Room Id");
      }
      const appointment = await this.appointmentRepository.findById(room.appointmentId!);
      if (new Date() >= new Date(room.startTime!)) {
         await this.appointmentRepository.update(appointment?._id!, { status: AppointmentStatus.COMPLETED });
         await this.videoSectionRepository.update(room._id!, { status: VideoSectionStatus.COMPLETED });
      }
   }
}
