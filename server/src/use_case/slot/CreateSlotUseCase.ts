import ISlotRepository from "../../domain/interface/repositories/ISlotRepository";
import IValidatorService from "../../domain/interface/services/IValidatorService";
import ISlot, { SlotStatus, Days } from "../../domain/entities/ISlot";
import { parse, format, addHours } from "../../utils/date-formatter";
import CustomError from "../../domain/entities/CustomError";
import { StatusCode } from "../../types";

export default class CreateSlotUseCase {
   protected interval: number;

   constructor(
      private slotRepository: ISlotRepository,
      private validatorService: IValidatorService
   ) {
      this.interval = 1;
   }

   async createManyByDay(doctorId: string, slots: ISlot[], day: Days): Promise<void> {
      this.validateSlotStartTimes(slots);
      this.validatorService.validateEnum(day, Object.values(Days));

      const existingSlots = await this.slotRepository.findManyByDay(doctorId, day);
      const newSlots = slots
         .filter((slot) => !existingSlots?.some((existing) => existing.startTime === slot.startTime))
         .map((slot) => ({
            ...slot,
            doctorId,
            status: "available" as SlotStatus,
            endTime: this.calculateEndTime(slot.startTime!),
            day,
         }));

      if (newSlots.length > 0) {
         await this.slotRepository.createMany(newSlots);
      }
   }

   async createForAllDays(doctorId: string, startTimes: string[]): Promise<void> {
      startTimes.forEach((time) => {
         this.validatorService.validateTimeFormat(time);
         this.validatorService.validateLength(time, 7, 11);
      });

      const days = Object.values(Days);
      const slotsByDay = days.reduce(
         (acc, day) => {
            acc[day] = startTimes.map((startTime) => ({
               startTime,
            }));
            return acc;
         },
         {} as Record<Days, ISlot[]>
      );

      for (const day of days) {
         const slots = slotsByDay[day];
         await this.createManyByDay(doctorId, slots, day);
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

   private calculateEndTime(startTime: string): string {
      const parsedStartTime = parse(startTime, "hh:mm a", new Date());
      const endTime = addHours(parsedStartTime, this.interval);
      return format(endTime, "hh:mm a");
   }
}
