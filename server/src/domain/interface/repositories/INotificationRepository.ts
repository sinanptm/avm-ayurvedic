import INotification from "../../entities/INotification";

export default interface INotificationRepository {
    create(notification: INotification): Promise<void>;
    findByPatientId(patientId: string): Promise<INotification[] | null>;
    findByDoctorId(doctorId: string): Promise<INotification[] | null>;
    clear(id: string): Promise<void>;
    clearAll(notificationIds: string[]): Promise<void>;
}
