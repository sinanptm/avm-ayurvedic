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
    doctorId?: string;
    day?: Days;
    startTime?: string;
    endTime?: string;
    status?: SlotStatus;
};