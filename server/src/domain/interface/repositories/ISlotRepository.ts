import ISlot, { Days, SlotStatus } from "../../entities/ISlot";

export default interface ISlotRepository {
    update(slot: ISlot): Promise<void>;
    createMany(slots: ISlot[]): Promise<void>;
    deleteManyByDayAndTime(doctorId: string, day: Days, startTimes: string[]): Promise<void>
    deleteManyByDaysAndTimes(doctorId:string,days:Days[],startTimes:string[]):Promise<void>;
    findMany(doctorId: string): Promise<ISlot[] | null>;
    findManyByDay(doctorId: string, day: Days, status?:SlotStatus): Promise<ISlot[] | null>;
    findById(slotId: string): Promise<ISlot | null>;
    findManyByDaysAndTimes(doctorId:string,days:Days[],startTimes:string[]):Promise<ISlot[]|null>;
    findManyNotInSlotIds(doctorId: string, day: Days, excludedSlotIds: string[]): Promise<ISlot[] | null> 
}