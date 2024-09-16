import { NextFunction, Response } from "express";
import { CustomRequest, StatusCode } from "../../../types";
import AppointmentUseCase from "../../../use_case/appointment/AppointmentUseCase";

export default class AppointmentController {
    constructor(
        private appointmentUseCase: AppointmentUseCase,
    ) { }

    async create(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const { appointment } = req.body;
            const patientId = req.patient?.id;
            const { appointmentId, orderId, patient } = await this.appointmentUseCase.createAppointment(appointment, patientId!);
            res.status(StatusCode.Success).json({ orderId, appointmentId, patient });
        } catch (error: any) {
            next(error);
        }
    }

    async completePayment(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const {  appointmentId,paymentData } = req.body;
            await this.appointmentUseCase.verifyPayment(paymentData, appointmentId)
            res.status(StatusCode.Success).json({ message: "Payment Verification Completed" });
        } catch (error) {
            next(error)
        }
    }

}
