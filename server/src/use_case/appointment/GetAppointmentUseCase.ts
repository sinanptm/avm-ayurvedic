import IAppointment, { AppointmentStatus, IExtendedAppointment } from "../../domain/entities/IAppointment";
import IPrescriptionRepository from "../../domain/interface/repositories/IPrescriptionRepository";
import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import IPaymentRepository from "../../domain/interface/repositories/IPaymentRepository";
import IValidatorService from "../../domain/interface/services/IValidatorService";
import CustomError from "../../domain/entities/CustomError";
import { PaginatedResult, StatusCode } from "../../types";

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
   ): Promise<PaginatedResult<IExtendedAppointment>> {
      this.validatorService.validateIdFormat(doctorId);

      if (status) {
         this.validatorService.validateEnum(status, Object.values(AppointmentStatus));
      }

      const appointments = await this.appointmentRepository.findManyByDoctorId(doctorId, offset, limit, status);
      const ids = appointments.items.map(el => el._id!);
      const prescriptions = await this.prescriptionRepository.findManyByAppointmentIds(ids);

      if (!prescriptions?.length) {
         appointments.items = appointments.items
            .filter(el => el.status !== AppointmentStatus.PAYMENT_PENDING)
            .map(el => ({
               ...el,
               isPrescriptionAdded: false
            }));

         return appointments;
      }

      const prescriptionMap = new Map<string, boolean>();
      prescriptions.forEach(el => {
         prescriptionMap.set(el.appointmentId?.toString()!, true);
      });
     
      appointments.items = appointments.items
         .filter(el => el.status !== AppointmentStatus.PAYMENT_PENDING)
         .map(el => ({
            ...el,
            isPrescriptionAdded: prescriptionMap.has(el._id?.toString()!)
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
      return await this.appointmentRepository.findManyByPatientId(patientId, offset, limit, status);
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
