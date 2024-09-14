import ISlot, { Days } from "../../entities/ISlot";

export default interface ISlotRepository {
    update(slot: ISlot): Promise<void>;
    createMany(slots: ISlot[]): Promise<void>;
    deleteManyByDayAndTime(doctorId: string, day: Days, startTimes: string[]): Promise<void>
    findMany(doctorId: string): Promise<ISlot[] | null>;
    findManyByDay(doctorId: string, day: Days): Promise<ISlot[] | null>;
}