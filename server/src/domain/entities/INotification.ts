export enum NotificationStatus {
    READ = 'read',
    UNREAD = 'unread'
}
export enum NotificationTypes {
    APPOINTMENT_CANCELED = 'appointment_canceled',
    APPOINTMENT_CONFIRMED = 'appointment_confirmed',
    APPOINTMENT_REMINDER = 'appointment_reminder',
}

export default interface INotification {
    readonly _id?: string;
    readonly patientId?: string;
    readonly doctorId?: string;
    readonly type?: string;
    readonly message?: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
    readonly appointmentId?:string
    status?: NotificationStatus,
}
