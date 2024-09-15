import Joi from "joi";
import IAppointment from "../../entities/IAppointment";

export interface IAppointmentValidator {
  createValidate(appointment: IAppointment): Joi.ValidationResult;
  updateValidate(appointment: IAppointment): Joi.ValidationResult;
}
