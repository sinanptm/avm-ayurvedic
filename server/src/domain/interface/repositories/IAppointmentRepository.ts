import IAppointment, { AppointmentStatus } from "../../entities/IAppointment";

export default interface IAppointmentRepository {
    create(appointment: IAppointment): Promise<string>;
    update(appointment: IAppointment): Promise<void>;
    updateManyBySlotIds(slotIds: string[], fields: IAppointment): Promise<void>;
    findByDateAndSlot(appointmentDate: string, slotId: string): Promise<IAppointment | null>;
    findManyByDateAndDoctorId(appointmentDate: string, doctorId: string): Promise<IAppointment[] | null>;
    updateAppointmentStatusToConfirmed(appointmentId: string): Promise<void>;
    findManyByDoctorId(doctorId: string, status:AppointmentStatus): Promise<IAppointment[] | null>
}
