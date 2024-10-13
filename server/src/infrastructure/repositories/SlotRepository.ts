import ISlot, { Days, SlotStatus } from "../../domain/entities/ISlot";
import ISlotRepository from "../../domain/interface/repositories/ISlotRepository";
import { SlotStatistics } from "../../types/statistics";
import SlotModel from "../model/SlotModel";

export default class SlotRepository implements ISlotRepository {
   model = SlotModel;

   async createMany(slots: ISlot[]): Promise<void> {
      await this.model.create(slots);
   }

   async create(slot: ISlot): Promise<ISlot> {
      return await this.model.create(slot);
   }

   async getSlotUsageCount(): Promise<SlotStatistics[]> {
      return await this.model.aggregate([
         {
            $lookup: {
               from: "appointments",
               localField: "_id",
               foreignField: "slotId",
               as: "appointments",
            },
         },
         {
            $group: {
               _id: "$startTime",
               count: { $sum: { $size: "$appointments" } },
            },
         },
         {
            $project: {
               time: "$_id",
               count: 1,
               _id: 0,
            },
         },
      ]);
   }

   async deleteManyByDayAndTime(doctorId: string, day: Days, startTimes: string[]): Promise<void> {
      await this.model.deleteMany({ doctorId, day, startTime: { $in: startTimes } });
   }

   async findManyByDaysAndTimes(doctorId: string, days: Days[], startTimes: string[]): Promise<ISlot[]> {
      return await this.model.find({
         doctorId,
         day: { $in: days },
         startTime: { $in: startTimes },
      });
   }
   async deleteManyByDaysAndTimes(doctorId: string, days: Days[], startTimes: string[]): Promise<void> {
      await this.model.deleteMany({
         doctorId,
         day: { $in: days },
         startTime: { $in: startTimes },
      });
   }

   async findManyNotInSlotIds(doctorId: string, day: Days, excludedSlotIds: string[]): Promise<ISlot[] | null> {
      return await this.model.find({
         doctorId,
         day,
         _id: { $nin: excludedSlotIds },
      });
   }
   async update(id: string, slot: ISlot): Promise<ISlot | null> {
      return await this.model.findByIdAndUpdate(id, slot, { upsert: true });
   }

   async findMany(doctorId: string): Promise<ISlot[] | null> {
      return await this.model.find({ doctorId });
   }

   async findManyByDay(doctorId: string, day: Days, status?: SlotStatus): Promise<ISlot[] | null> {
      const query: any = { doctorId, day };
      if (status) {
         query.status = status;
      }
      return await this.model.find(query);
   }

   async findById(slotId: string): Promise<ISlot | null> {
      return await this.model.findById(slotId);
   }
}
