import ISlot, { Days } from "../../domain/entities/ISlot";
import ISlotRepository from "../../domain/interface/repositories/ISlotRepository";
import SlotModel from "../database/SlotModel";
import { FilterQuery } from "mongoose";

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

    async deleteManyByTime({ doctorId, startTime }: ISlot): Promise<void> {
        const filter: FilterQuery<ISlot> = { doctorId, startTime };
        await this.model.deleteMany(filter);
    }

    async deleteManyByDay({ doctorId, day }: ISlot): Promise<void> {
        const filter: FilterQuery<ISlot> = { doctorId, day };
        await this.model.deleteMany(filter);
    }

    async findMany(doctorId: string): Promise<ISlot[] | null> {
        return await this.model.find({ doctorId });
    }

    async findManyByDay(doctorId: string, day: Days): Promise<ISlot[] | null> {
        return await this.model.find({ doctorId, day })
    }
}
