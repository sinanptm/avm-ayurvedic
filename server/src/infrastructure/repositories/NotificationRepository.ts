import INotification from "../../domain/entities/INotification";
import INotificationRepository from "../../domain/interface/repositories/INotificationRepository";
import NotificationModel from "../database/NotificationMode";

export default class NotificationRepository implements INotificationRepository {
    model = NotificationModel

    async create(notification: INotification): Promise<void> {
        await this.model.create(notification)
    }
    async findByPatientId(patientId: string): Promise<INotification[] | null> {
        return this.model.find({ patientId })
    }
    async findByDoctorId(doctorId: string): Promise<INotification[] | null> {
        return this.model.find({ doctorId })
    }
    async clear(id: string): Promise<void> {
        await this.model.findByIdAndDelete(id);
    }
    async clearAll(notificationIds: string[]): Promise<void> {
        await this.model.deleteMany({ _id: { $in: notificationIds } })
    }
}