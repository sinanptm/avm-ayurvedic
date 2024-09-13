import { Types } from "mongoose";

export enum Days {
    Monday = "monday",
    Tuesday = "tuesday",
    Wednesday = "wednesday",
    Thursday = "thursday",
    Friday = "friday",
    Saturday = "saturday",
    Sunday = "sunday",
 }
export type SlotStatus = "available" | "booked";

export interface ISlot {
    _id?: string;
    doctorId: string | Types.ObjectId;
    day: Days;
    startTime: string;
    endTime: string;
    status: SlotStatus;
};