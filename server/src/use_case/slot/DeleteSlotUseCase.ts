import ISlot, { Days } from "../../domain/entities/ISlot";
import ISlotRepository from "../../domain/interface/repositories/ISlotRepository";
import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import { AppointmentStatus } from "../../domain/entities/IAppointment";
import CustomError from "../../domain/entities/CustomError";
import { StatusCode } from "../../types";
import IValidatorService from "../../domain/interface/services/IValidatorService";

export default class DeleteSlotUseCase {
   constructor(
      private slotRepository: ISlotRepository,
      private appointmentRepository: IAppointmentRepository,
      private validatorService: IValidatorService
   ) {}

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
            await this.appointmentRepository.updateManyBySlotIds(bookedSlotIds, {
               status: AppointmentStatus.CANCELLED,
            });
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
            await this.appointmentRepository.updateManyBySlotIds(bookedSlotIds, {
               status: AppointmentStatus.CANCELLED,
            });
         }
         await this.slotRepository.deleteManyByDaysAndTimes(doctorId, days, startTimes);
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
