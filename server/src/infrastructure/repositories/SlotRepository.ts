import ISlot, { Days } from "../../domain/entities/ISlot";
import ISlotRepository from "../../domain/interface/repositories/ISlotRepository";
import { isValidObjectId } from "../database/isValidObjId";
import SlotModel from "../database/SlotModel";

export default class SlotRepository implements ISlotRepository {
    model = SlotModel;

    async createMany(slots: ISlot[]): Promise<void> {
        await this.model.create(slots);
    }

    async deleteManyByDayAndTime(doctorId: string, day: Days, startTimes: string[]): Promise<void> {
        await this.model.deleteMany({ doctorId, day, startTime: { $in: startTimes } });
    }

    async update(slot: ISlot): Promise<void> {
        await this.model.findByIdAndUpdate(slot._id, slot, { upsert: true });
    }

    async findMany(doctorId: string): Promise<ISlot[] | null> {
        return await this.model.find({ doctorId });
    }

    async findManyByDay(doctorId: string, day: Days): Promise<ISlot[] | null> {
        return await this.model.find({ doctorId, day })
    }
    async findById(slotId: string): Promise<ISlot | null> {
        if(!isValidObjectId(slotId)) throw new Error("Invalid Object Id")
        return await this.model.findById(slotId)
    }
   
}
