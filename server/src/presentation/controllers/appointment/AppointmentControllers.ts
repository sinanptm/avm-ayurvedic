import { NextFunction, Response } from "express";
import { CustomRequest, StatusCode } from "../../../types";
import CreateAppointmentUseCase from "../../../use_case/appointment/CreateAppointmentUseCase";
import GetAppointmentUseCase from "../../../use_case/appointment/GetAppointmentUseCase";
import UpdateAppointmentUseCase from "../../../use_case/appointment/UpdateAppointmentUseCase";
import { AppointmentStatus } from "../../../domain/entities/IAppointment";

export default class AppointmentController {
    constructor(
        private createAppointmentUseCase: CreateAppointmentUseCase,
        private getAppointmentUseCase: GetAppointmentUseCase,
        private updateAppointmentUseCase: UpdateAppointmentUseCase
    ) { }

    async create(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const { appointment } = req.body;
            const patientId = req.patient?.id;
            const { checkoutUrl, sessionId } = await this.createAppointmentUseCase.exec(appointment, patientId!);
            res.status(StatusCode.Success).json({ checkoutUrl, sessionId });
        } catch (error: any) {
            next(error);
        }
    }

    async handleStripeWebhook(req: CustomRequest, res: Response, next: NextFunction) {
        const signature = req.headers['stripe-signature'] as string;
        

        try {
            await this.createAppointmentUseCase.handleStripeWebhook(req.body, signature);
            res.status(StatusCode.Success).json({ message: 'Webhook processed successfully' });
        } catch (err: any) {
            console.error('Webhook processing error:', err);
            res.status(StatusCode.BadRequest).send(`Webhook Error: ${err.message}`);
        }
    }

    async getAppointmentsDoctor(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const doctorId = req.doctor?.id;
            const status = req.query.status as AppointmentStatus | "undefined";
            let offset = parseInt(req.query.offset as string);
            let limit = parseInt(req.query.limit as string);

            offset = isNaN(offset) || offset < 0 ? 0 : offset;
            limit = isNaN(limit) || limit < 0 ? 10 : Math.min(limit, 100);

            const data = await this.getAppointmentUseCase.getAppointmentsByDoctorId(doctorId!, offset, limit, status === 'undefined' ? undefined : status);
            res.status(StatusCode.Success).json(data)
        } catch (error) {
            next(error)
        }
    }

    async getAppointmentDetails(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const appointmentId = req.params.appointmentId
            const appointment = await this.getAppointmentUseCase.getAppointmentDetails(appointmentId);
            res.status(StatusCode.Success).json(appointment);
        } catch (error) {
            next(error)
        }
    }

    async getAppointmentSuccussDetails(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const paymentId = req.params.paymentId
            const appointment = await this.getAppointmentUseCase.getSuccessPageDetails(paymentId);
            res.status(StatusCode.Success).json(appointment);
        } catch (error) {
            next(error)
        }
    }

    async updateAppointment(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const { appointmentId, status } = req.body
            await this.updateAppointmentUseCase.updateStatus(appointmentId, status);
            res.status(StatusCode.Success).json({ message: "Status Updated" })
        } catch (error) {
            next(error)
        }
    }

    async getAppointmentsPatient(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const patientId = req.patient?.id;
            const status = req.query.status as AppointmentStatus | "undefined";
            let offset = parseInt(req.query.offset as string);
            let limit = parseInt(req.query.limit as string);

            offset = isNaN(offset) || offset < 0 ? 0 : offset;
            limit = isNaN(limit) || limit < 0 ? 10 : Math.min(limit, 100);

            const data = await this.getAppointmentUseCase.getAppointmentsByPatientId(patientId!, offset, limit, status === 'undefined' ? undefined : status);
            res.status(StatusCode.Success).json(data)
        } catch (error) {
            next(error)
        }
    }

    async updateStatusAndNotes(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const { appointmentId, status, notes } = req.body;
            await this.updateAppointmentUseCase.updateStatusAndNote(appointmentId, status, notes);
            res.status(StatusCode.Success).json({ message: "Appointment updated successfully" });
        } catch (error) {
            next(error)
        }
    }
}
