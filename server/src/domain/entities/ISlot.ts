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
    readonly _id?: string;
    readonly doctorId?: string;
    readonly createdAt?: string;
    readonly updatedAt?: string;
    readonly startTime?: string;
    day?: Days;
    endTime?: string;
    status?: SlotStatus;
};