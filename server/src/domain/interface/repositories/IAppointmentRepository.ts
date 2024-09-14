import IAppointment from "../../entities/IAppointment";

export default  interface IAppointmentRepository {
    create(appointment:IAppointment):Promise<void>;
    update(appointment:IAppointment):Promise<void>;
}