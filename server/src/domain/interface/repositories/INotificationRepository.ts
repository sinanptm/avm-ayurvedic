import INotification from "../../entities/INotification";
import IRepository from "./IRepository";

export default interface INotificationRepository extends IRepository<INotification> {
    findByPatientId(patientId: string): Promise<INotification[] | null>;
    findByDoctorId(doctorId: string): Promise<INotification[] | null>;
    clear(id: string): Promise<void>;
    clearAll(notificationIds: string[]): Promise<void>;
}
