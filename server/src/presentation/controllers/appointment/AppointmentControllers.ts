import { NextFunction, Response } from "express";
import { CustomRequest, StatusCode } from "../../../types";
import AppointmentUseCase from "../../../use_case/appointment/AppointmentUseCase";
import AppointmentValidator from "../../validators/AppointmentValidator";

export default class AppointmentController {
    constructor(
        private appointmentUseCase: AppointmentUseCase,
        private appointmentValidator: AppointmentValidator
    ) { }

    async create(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const { appointment } = req.body;
            const { error } = this.appointmentValidator.validate(appointment);
            if (error) {
                return res.status(StatusCode.BadRequest).json({ message: error.details[0].message });
            }
            const patientId = req.patient?.id;
            await this.appointmentUseCase.create(appointment, patientId!);
            res.status(StatusCode.Success).json({ message: "Appointment created successfully" });
        } catch (error:any) {
            if(error.message==='Slot already booked'){
                return res.status(StatusCode.Conflict).json({message:error.message})
            }
            next(error);
        }
    }

}
