import CustomError from "../../domain/entities/CustomError";
import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import ISlotRepository from "../../domain/interface/repositories/ISlotRepository";
import IValidatorService from "../../domain/interface/services/IValidatorService";
import IPaymentService from "../../domain/interface/services/IPaymentService";
import IPaymentRepository from "../../domain/interface/repositories/IPaymentRepository";
import IPayment, { PaymentStatus } from "../../domain/entities/IPayment";
import IAppointment, { AppointmentStatus, AppointmentType } from "../../domain/entities/IAppointment";
import { StatusCode } from "../../types";
import { IVideoSectionRepository } from "../../domain/interface/repositories/IVideoSectionRepository";
import IPatientRepository from "../../domain/interface/repositories/IPatientRepository";
import IDoctorRepository from "../../domain/interface/repositories/IDoctorRepository";
import IDoctor from "../../domain/entities/IDoctor";
import IPatient from "../../domain/entities/IPatient";
import { VideoSectionStatus } from "../../domain/entities/IVideoChatSection";
import { addMinutes, parse, format } from "../../utils/date-formatter";

export default class AppointmentUseCase {
   bookingAmount: number;

   constructor(
      private appointmentRepository: IAppointmentRepository,
      private slotRepository: ISlotRepository,
      private validatorService: IValidatorService,
      private paymentService: IPaymentService,
      private paymentRepository: IPaymentRepository,
      private videoSectionRepository: IVideoSectionRepository,
      private doctorRepository: IDoctorRepository,
      private patientRepository: IPatientRepository
   ) {
      this.bookingAmount = 300;
   }

   async exec(appointmentData: IAppointment, patientId: string): Promise<{ sessionId: string; checkoutUrl: string }> {
      this.validateAppointmentData(appointmentData, patientId);

      const patient = await this.patientRepository.findById(patientId);
      const doctor = await this.doctorRepository.findById(appointmentData.doctorId!);

      if (!patient || !doctor) throw new CustomError("Patient or Doctor Not Found", StatusCode.NotFound);

      const slot = await this.slotRepository.findById(appointmentData.slotId!);
      if (!slot) throw new CustomError("Slot Not Found", StatusCode.NotFound);

      if (slot.status === "booked") {
         const bookedAppointment = await this.appointmentRepository.findByDateAndSlot(
            appointmentData.appointmentDate! as string,
            appointmentData.slotId!
         );
         if (bookedAppointment) throw new CustomError("Slot already booked", StatusCode.Conflict);
      } else {
         slot.status = "booked";
         await this.slotRepository.update(slot);
      }

      const payment = await this.paymentRepository.create({
         orderId: "",
         appointmentId: appointmentData._id!,
         amount: this.bookingAmount,
         currency: "INR",
         status: PaymentStatus.PENDING,
      });

      const checkoutSession = await this.paymentService.createCheckoutSession(
         this.bookingAmount,
         "INR",
         `${process.env.CLIENT_URL}/new-appointment/${payment._id}`,
         `${process.env.CLIENT_URL}/new-appointment/cancel/${payment._id}`,
         { paymentId: payment._id?.toString() }
      );

      const appointment = await this.appointmentRepository.create({
         ...appointmentData,
         patientId,
         status: AppointmentStatus.PAYMENT_PENDING,
         paymentId: payment._id!,
      });

      await this.paymentRepository.update({
         _id: payment._id,
         orderId: checkoutSession.id,
         appointmentId: appointment._id,
      });

      await this.createVideoSection(appointment, patient!, doctor!, slot.startTime!)

      return { sessionId: checkoutSession.id, checkoutUrl: checkoutSession.url! };
   }

   private async createVideoSection(appointment: IAppointment, patient: IPatient, doctor: IDoctor, slotStartTime: string): Promise<void> {
      const appointmentDate = appointment.appointmentDate as string;
      const slotStartTimeFormatted = parse(slotStartTime, 'hh:mm a', new Date(appointmentDate));
   
      const appointmentDurationMinutes = 60;
      const slotEndTime = addMinutes(slotStartTimeFormatted, appointmentDurationMinutes);
   
      const calculatedStartTime = format(slotStartTimeFormatted, "yyyy-MM-dd'T'HH:mm:ssXXX");
      const calculatedEndTime = format(slotEndTime, "yyyy-MM-dd'T'HH:mm:ssXXX");
   
      await this.videoSectionRepository.create({
         appointmentId: appointment._id!,
         patientName: patient.name,
         doctorName: doctor.name,
         patientProfile: patient.profile,
         doctorProfile: doctor.image,
         startTime: calculatedStartTime,
         endTime: calculatedEndTime,
         createdAt: appointment.createdAt as unknown as Date,
         updatedAt: appointment.updatedAt as unknown as Date,
         status: VideoSectionStatus.PENDING,
         patientId: patient._id!,
         doctorId: doctor._id!
      });
   }

   async handleStripeWebhook(body: Buffer, signature: string): Promise<void> {
      const result = await this.paymentService.handleWebhookEvent(body, signature);
      const { event, transactionId } = result;

      if (!event || !event.data || !event.data.object) {
         return;
      }
      const paymentIntentMetadata = event.data.object.metadata as { paymentId: string };

      if (!paymentIntentMetadata || !paymentIntentMetadata.paymentId) {
         return;
      }

      await this.verifyPaymentIntent(paymentIntentMetadata.paymentId, transactionId);
   }


   private async verifyPaymentIntent(id: string, transactionId: string): Promise<IPayment | null> {
      const payment = await this.paymentRepository.findById(id);

      if (!payment) {
         return null;
      }

      await this.paymentRepository.update({
         _id: payment._id,
         status: PaymentStatus.COMPLETED,
         paymentId: transactionId
      });

      await this.appointmentRepository.updateAppointmentStatusToConfirmed(payment.appointmentId!);

      return payment;
   }

   private validateAppointmentData(
      { appointmentDate, appointmentType, doctorId, notes, reason, slotId }: IAppointment,
      patientId: string
   ): void {
      this.validatorService.validateRequiredFields({ slotId, appointmentType, doctorId, reason, appointmentDate })!;
      this.validatorService.validateIdFormat(doctorId!);
      this.validatorService.validateIdFormat(slotId!);
      this.validatorService.validateIdFormat(patientId!);
      this.validatorService.validateEnum(appointmentType!, Object.values(AppointmentType));
      this.validatorService.validateDateFormat(appointmentDate! as string);
      this.validatorService.validateLength(reason!, 1, 255);

      if (notes) this.validatorService.validateLength(notes, 0, 255);
   }
}
