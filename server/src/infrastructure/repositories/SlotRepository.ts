import ISlot, { Days } from "../../domain/entities/ISlot";
import ISlotRepository from "../../domain/interface/repositories/ISlotRepository";
import SlotModel from "../database/SlotModel";
import { FilterQuery } from "mongoose";

export default class SlotRepository implements ISlotRepository {
    model = SlotModel;

    async create(slot: ISlot): Promise<void> {
        await this.model.create(slot);
    }

    async update(slot: ISlot): Promise<void> {
        await this.model.findByIdAndUpdate(slot._id, slot, { new: true });
    }

    async deleteManyByTime({ doctorId, startTime, status }: ISlot): Promise<void> {
        const filter: FilterQuery<ISlot> = { doctorId, startTime };
        if (status) filter.status = status;
        await this.model.deleteMany(filter);
    }

    async deleteManyByDay({ doctorId, day, status }: ISlot): Promise<void> {
        const filter: FilterQuery<ISlot> = { doctorId, day };
        if (status) filter.status = status;
        await this.model.deleteMany(filter);
    }

    async findOne({ doctorId, startTime, day }: ISlot): Promise<ISlot | null> {
        return await this.model.findOne({ doctorId, startTime, day });
    }

    async findMany(doctorId: string): Promise<ISlot[] | null> {
        return await this.model.find({ doctorId });
    }

    async findManyByDay(doctorId: string, day: Days): Promise<ISlot[] | null> {
        return await this.model.find({ doctorId, day })
    }
}
