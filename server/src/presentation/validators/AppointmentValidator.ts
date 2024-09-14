import Joi from "joi";
import IAppointment, { AppointmentType } from "../../domain/entities/IAppointment";

export default class AppointmentValidator {
    private schema: Joi.ObjectSchema;

    constructor() {
        this.schema = Joi.object({
            doctorId: Joi.string().required(),
            patientId: Joi.string().required(),
            slotId: Joi.string().required(),
            appointmentType: Joi.string().valid(...Object.values(AppointmentType)).required(),
            appointmentDate: Joi.string().isoDate().required(),
            reason: Joi.string().optional(),
            notes: Joi.string().optional(),
        });
    }

    validate(appointment: IAppointment) {
        return this.schema.validate(appointment);
    }
}
