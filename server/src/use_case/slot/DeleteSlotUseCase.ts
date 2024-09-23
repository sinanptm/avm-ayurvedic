import ISlotRepository from "../../domain/interface/repositories/ISlotRepository";
import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import CustomError from "../../domain/entities/CustomError";
import IValidatorService from "../../domain/interface/services/IValidatorService";
import INotificationRepository from "../../domain/interface/repositories/INotificationRepository";
import ISlot, { Days } from "../../domain/entities/ISlot";
import { NotificationTypes } from "../../domain/entities/INotification";
import { AppointmentStatus } from "../../domain/entities/IAppointment";
import { StatusCode } from "../../types";

export default class DeleteSlotUseCase {
   constructor(
      private slotRepository: ISlotRepository,
      private appointmentRepository: IAppointmentRepository,
      private validatorService: IValidatorService,
      private notificationRepository: INotificationRepository
   ) { }

   async deleteManyByDay(doctorId: string, slots: ISlot[], day: Days): Promise<void> {
      this.validateSlotStartTimes(slots);
      this.validatorService.validateEnum(day, Object.values(Days));

      const startTimes = slots.map((el) => el.startTime!);
      const bookedSlots = await this.slotRepository.findManyByDay(doctorId, day, "booked");

      if (bookedSlots?.length) {
         const bookedSlotIds = bookedSlots
            .filter((slot) => startTimes.includes(slot.startTime!))
            .map((slot) => slot._id)
            .filter((id): id is string => id !== undefined);

         if (bookedSlotIds.length > 0) {
            await this.handleAppointmentUpdates(bookedSlotIds);
         }
      }

      await this.slotRepository.deleteManyByDayAndTime(doctorId, day, startTimes);
   }

   async deleteForAllDays(doctorId: string, startTimes: string[]): Promise<void> {
      startTimes.forEach((time) => {
         this.validatorService.validateTimeFormat(time);
         this.validatorService.validateLength(time, 7, 11);
      });

      const days = Object.values(Days);

      const slots = await this.slotRepository.findManyByDaysAndTimes(doctorId, days, startTimes);

      if (slots?.length) {
         const bookedSlotIds = slots
            .filter((slot) => slot.status === "booked")
            .map((slot) => slot._id)
            .filter((id): id is string => id !== undefined);

         if (bookedSlotIds.length > 0) {
            await this.handleAppointmentUpdates(bookedSlotIds);
         }
         await this.slotRepository.deleteManyByDaysAndTimes(doctorId, days, startTimes);
      }
   }

   private async handleAppointmentUpdates(bookedSlotIds: string[]): Promise<void> {
      const appointments = await this.appointmentRepository.updateManyBySlotIdsNotInStatuses(
         bookedSlotIds,
         { status: AppointmentStatus.CANCELLED },
         [AppointmentStatus.CANCELLED, AppointmentStatus.COMPLETED]
      );

      if (appointments) {
         for (const appointment of appointments) {
            await this.notificationRepository.create({
               appointmentId: appointment._id,
               message: `Your appointment has been canceled. If you have any questions, please contact your doctor.`,
               patientId: appointment.patientId,
               type: NotificationTypes.APPOINTMENT_CANCELED,
            });
         }
      }
   }

   private validateSlotStartTimes(slots: ISlot[]): void {
      slots.forEach((slot) => {
         if (!slot.startTime) {
            throw new CustomError(`Missing startTime for slot: ${JSON.stringify(slot)}`, StatusCode.BadRequest);
         }
         this.validatorService.validateTimeFormat(slot.startTime);
         this.validatorService.validateLength(slot.startTime, 7, 11);
      });
   }

}
