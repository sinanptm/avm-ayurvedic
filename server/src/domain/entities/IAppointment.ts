export enum AppointmentStatus {
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
    readonly startTime?:string;
    status?: AppointmentStatus;
}
