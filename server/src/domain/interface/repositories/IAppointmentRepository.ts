import { PaginatedResult } from "../../../types";
import IAppointment, { AppointmentStatus, IExtendedAppointment } from "../../entities/IAppointment";

export default interface IAppointmentRepository {
   create(appointment: IAppointment): Promise<string>;
   update(appointment: IAppointment): Promise<void>;
   updateManyBySlotIds(slotIds: string[], fields: IAppointment): Promise<void>;
   findByDateAndSlot(appointmentDate: string, slotId: string): Promise<IAppointment | null>;
   findManyByDateAndDoctorId(appointmentDate: string, doctorId: string): Promise<IAppointment[] | null>;
   updateAppointmentStatusToConfirmed(appointmentId: string): Promise<void>;
   findDetailsById(appointmentId: string): Promise<IExtendedAppointment | null>;
   findManyByDoctorId(
      doctorId: string,
      offset: number,
      limit: number,
      status?: AppointmentStatus
   ): Promise<PaginatedResult<IAppointment> | null>;
   findMayByPatientId(
      patientId: string,
      offset: number,
      limit: number,
      status?: AppointmentStatus
   ): Promise<PaginatedResult<IAppointment> | null>;
}
