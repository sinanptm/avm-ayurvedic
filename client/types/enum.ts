
export enum DoctorsFilter {
    BLOCKED = "blocked",
    NOT_VERIFIED = "not-verified",
    VERIFIED = "verified"
}
export enum Days {
    Monday = "monday",
    Tuesday = "tuesday",
    Wednesday = "wednesday",
    Thursday = "thursday",
    Friday = "friday",
    Saturday = "saturday",
    Sunday = "sunday"
}export enum AppointmentStatus {
    // PAYMENT_PENDING = "payment-pending",
    PENDING = "pending",
    CONFIRMED = "confirmed",
    CANCELLED = "cancelled",
    COMPLETED = "completed"
}
export enum AppointmentType {
    VIDEO_CONSULTING = "video-consulting",
    IN_PERSON = "in-person"
}
export enum NotificationTypes {
    APPOINTMENT_CANCELED = 'appointment_canceled',
    APPOINTMENT_CONFIRMED = 'appointment_confirmed',
    APPOINTMENT_REMINDER = 'appointment_reminder'
}

