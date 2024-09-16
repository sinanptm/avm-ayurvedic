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
            const { appointmentId, orderId } = await this.appointmentUseCase.createAppointment(appointment, patientId!);
            res.status(StatusCode.Success).json({ orderId, appointmentId });
        } catch (error: any) {
            next(error);
        }
    }

    async completePayment(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature, appointmentId } = req.body;
            await this.appointmentUseCase.verifyPayment({ razorpay_order_id, razorpay_payment_id, razorpay_signature }, appointmentId)
            res.status(StatusCode.Success).json({ message: "Payment Verification Completed" });
        } catch (error) {
            next(error)
        }
    }

}
