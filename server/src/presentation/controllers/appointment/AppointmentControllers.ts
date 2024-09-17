import { NextFunction, Response } from "express";
import { CustomRequest, StatusCode } from "../../../types";
import CreateAppointmentUseCase from "../../../use_case/appointment/CreateAppointmentUseCase";
import GetAppointmentUseCase from "../../../use_case/appointment/GetAppointmentUseCase";
import { AppointmentStatus } from "../../../domain/entities/IAppointment";

export default class AppointmentController {
    constructor(
        private createAppointmentUseCase: CreateAppointmentUseCase,
        private getAppointmentUseCase: GetAppointmentUseCase
    ) { }

    async create(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const { appointment } = req.body;
            const patientId = req.patient?.id;
            const { appointmentId, orderId, patient } = await this.createAppointmentUseCase.exec(appointment, patientId!);
            res.status(StatusCode.Success).json({ orderId, appointmentId, patient });
        } catch (error: any) {
            next(error);
        }
    }

    async completePayment(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const {  appointmentId,paymentData } = req.body;
            await this.createAppointmentUseCase.verifyPayment(paymentData, appointmentId)
            res.status(StatusCode.Success).json({ message: "Payment Verification Completed" });
        } catch (error) {
            next(error)
        }
    }

    async getAppointmentsDoctor(req:CustomRequest,res:Response,next:NextFunction){
        try {
            const doctorId = req.doctor?.id;
            const status = req.query.status as AppointmentStatus;
            let offset = parseInt(req.query.offset as string);
            let limit = parseInt(req.query.limit as string);
        
            offset = isNaN(offset) || offset < 0 ? 0 : offset;
            limit = isNaN(limit) || limit < 0 ? 10 : Math.min(limit, 100); 
            
            const data =  await this.getAppointmentUseCase.getAppointmentsByDoctorId(doctorId!,offset,limit,status);
            res.status(StatusCode.Success).json(data)
        } catch (error) {
            next(error)
        }
    }

}
