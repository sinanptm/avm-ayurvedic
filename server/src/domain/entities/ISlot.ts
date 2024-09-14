import { Types } from "mongoose";

export enum Days {
    Sunday = "sunday",
    Monday = "monday",
    Tuesday = "tuesday",
    Wednesday = "wednesday",
    Thursday = "thursday",
    Friday = "friday",
    Saturday = "saturday"
}
export type SlotStatus = "available" | "booked";

export default interface ISlot {
    _id?: string;
    doctorId?: string | Types.ObjectId;
    day?: Days;
    startTime?: string;
    endTime?: string;
    status?: SlotStatus;
};