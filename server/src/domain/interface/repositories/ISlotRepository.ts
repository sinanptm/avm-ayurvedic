import ISlot, { Days } from "../../entities/ISlot";

export default interface ISlotRepository {
    create(slot: ISlot): Promise<void>;
    update(slot: ISlot): Promise<void>;
    deleteManyByTime({ doctorId, startTime, status }: ISlot): Promise<void>;
    deleteManyByDay({ doctorId, status, day }: ISlot): Promise<void>;
    findOne({ startTime, doctorId, day }: ISlot): Promise<ISlot | null>;
    findMany(doctorId: string): Promise<ISlot[] | null>;
    findManyByDay(doctorId:string,day:Days):Promise<ISlot[] | null>;
}