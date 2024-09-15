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
            await this.appointmentUseCase.create(appointment, patientId!);
            res.status(StatusCode.Success).json({ message: "Appointment created successfully" });
        } catch (error: any) {
            if (error.message === 'Slot already booked') {
                return res.status(StatusCode.Conflict).json({ message: error.message })
            }
            next(error);
        }
    }

}
