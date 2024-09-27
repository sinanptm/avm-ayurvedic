import { NextFunction, Response } from "express";
import { CustomRequest, StatusCode } from "../../../types";
import NotificationUseCase from "../../../use_case/notification/NotificationUseCae";

export default class NotificationController {
    constructor(
        private notificationUseCase: NotificationUseCase
    ) {
        this.getAllPatientNotifications = this.getAllPatientNotifications.bind(this);
        this.getAllDoctorNotifications = this.getAllDoctorNotifications.bind(this);
        this.clearMultipleNotifications = this.clearMultipleNotifications.bind(this);
        this.clearSingleNotification = this.clearSingleNotification.bind(this);
    }

    async getAllPatientNotifications(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const patientId = req.patient?.id;
            const notifications = await this.notificationUseCase.getAllPatient(patientId!);
            res.status(StatusCode.Success).json(notifications);
        } catch (error) {
            next(error);
        }
    }

    async getAllDoctorNotifications(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const doctorId = req.doctor?.id;
            const notifications = await this.notificationUseCase.getAllDoctor(doctorId!);
            res.status(StatusCode.Success).json(notifications);
        } catch (error) {
            next(error);
        }
    }

    async clearMultipleNotifications(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const { notificationIds } = req.body;
            await this.notificationUseCase.clearAll(notificationIds);
            res.status(StatusCode.Success).json({ message: "Notifications cleared" });
        } catch (error) {
            next(error);
        }
    }

    async clearSingleNotification(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const { notificationId } = req.params;
            await this.notificationUseCase.clearOn(notificationId);
            res.status(StatusCode.Success).json({ message: "Notification cleared" });
        } catch (error) {
            next(error);
        }
    }
}
