import { IPatient } from "./IPatient";
import ISlot from "./ISlot";

export enum AppointmentStatus {
    PAYMENT_PENDING = 'payment-pending',
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
    COMPLETED = 'completed',
}
export enum AppointmentType {
    VIDEO_CONSULTING = "video-consulting",
    IN_PERSON = "in-person",
}
export default interface IAppointment {
    readonly _id?: string;
    readonly doctorId?: string;
    readonly patientId?: string;
    readonly slotId?: string;
    readonly createdAt?: string;
    readonly updatedAt?: string;
    readonly appointmentType?: AppointmentType;
    readonly appointmentDate?: string;
    readonly reason?: string;
    readonly notes?: string;
    readonly paymentId?: string;
    status?: AppointmentStatus;
}

export interface IExtendedAppointment extends IAppointment {
    patient?: IPatient;   
    slot?: ISlot;       
}