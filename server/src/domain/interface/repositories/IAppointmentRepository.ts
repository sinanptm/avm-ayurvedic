import IAppointment, { AppointmentStatus } from "../../entities/IAppointment";

export default interface IAppointmentRepository {
    create(appointment: IAppointment): Promise<void>;
    update(appointment: IAppointment): Promise<void>;
    updateStatusMany(appointmentIds: string[], status: AppointmentStatus): Promise<void>;
    updateManyBySlotIds(slotIds: string[], fields: IAppointment): Promise<void>;
    findOneBySlotId(slotId: string): Promise<IAppointment | null>;
    findByDateAndSlot(appointmentDate: string, slotId:string): Promise<IAppointment | null>;
    findManyByDateAndDoctorId(appointmentDate:string,doctorId:string):Promise<IAppointment[] | null>;
}
