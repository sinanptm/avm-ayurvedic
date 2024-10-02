import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import IPaymentRepository from "../../domain/interface/repositories/IPaymentRepository";
import IPrescriptionRepository from "../../domain/interface/repositories/IPrescriptionRepository";
import IValidatorService from "../../domain/interface/services/IValidatorService";
import CustomError from "../../domain/entities/CustomError";
import IAppointment, { AppointmentStatus, IExtendedAppointment } from "../../domain/entities/IAppointment";
import { PaginatedResult, StatusCode } from "../../types";
import IPrescription from "../../domain/entities/IPrescription";

export default class GetAppointmentUseCase {
   constructor(
      private appointmentRepository: IAppointmentRepository,
      private validatorService: IValidatorService,
      private paymentRepository: IPaymentRepository,
      private prescriptionRepository: IPrescriptionRepository
   ) { }

   async getAppointmentsByDoctorId(
      doctorId: string,
      offset: number,
      limit: number,
      status?: AppointmentStatus
   ): Promise<PaginatedResult<IExtendedAppointment> | []> {
      this.validatorService.validateIdFormat(doctorId);
   
      if (status) {
         this.validatorService.validateEnum(status, Object.values(AppointmentStatus));
      }
      const appointments = await this.appointmentRepository.findManyByDoctorId(doctorId, offset, limit, status);
   
      if (!appointments || !appointments.items || appointments.items.length === 0) {
         return [];
      }
   
      const appointmentIds = appointments.items.map(appointment => appointment._id!);
   
      const prescriptions = await this.prescriptionRepository.findManyByAppointmentIds(appointmentIds);
   
      const prescriptionMap = new Map<string, boolean>();
      prescriptions!.forEach(prescription => {
         prescriptionMap.set(prescription.appointmentId!, true);
      });
   
      appointments.items = appointments.items
         .filter(appointment => appointment.status !== AppointmentStatus.PAYMENT_PENDING) 
         .map(appointment => ({
            ...appointment,
            isPrescriptionAdded: prescriptionMap.has(appointment._id!)
         }));
   
      return appointments;
   }
   
   async getAppointmentDetails(appointmentId: string): Promise<IExtendedAppointment | null> {
      this.validatorService.validateIdFormat(appointmentId);
      return await this.appointmentRepository.findDetailsById(appointmentId);
   }

   async getAppointmentsByPatientId(
      patientId: string,
      offset: number,
      limit: number,
      status?: AppointmentStatus
   ): Promise<PaginatedResult<IAppointment> | null> {
      return await this.appointmentRepository.findMayByPatientId(patientId, offset, limit, status);
   }

   async getSuccessPageDetails(paymentId: string): Promise<IAppointment | null> {
      this.validatorService.validateIdFormat(paymentId);

      const payment = await this.paymentRepository.findById(paymentId);

      if (!payment) {
         throw new CustomError("Payment not found", StatusCode.NotFound);
      }

      const paymentCreatedAt = new Date(payment.createdAt!);
      const now = new Date();

      const timeDifferenceInMinutes = (now.getTime() - paymentCreatedAt.getTime()) / (1000 * 60);

      if (timeDifferenceInMinutes > 10) {
         throw new CustomError("Payment is older than 10 minutes", StatusCode.BadRequest);
      }

      return await this.appointmentRepository.findDetailsById(payment.appointmentId!);
   }
}
