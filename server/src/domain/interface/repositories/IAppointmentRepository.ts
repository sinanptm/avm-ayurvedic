import { PaginatedResult } from "../../../types";
import IAppointment, { AppointmentStatus, IExtendedAppointment } from "../../entities/IAppointment";
import IRepository from "./IRepository";

export default interface IAppointmentRepository extends IRepository<IAppointment> {
   updateManyBySlotIdsNotInStatuses(slotIds: string[], fields: IAppointment, notInStatuses:AppointmentStatus[]): Promise<IAppointment[] | null>;
   findByDateAndSlot(appointmentDate: string, slotId: string): Promise<IAppointment | null>;
   findManyByDateAndDoctorId(appointmentDate: string, doctorId: string): Promise<IAppointment[] | null>;
   updateAppointmentStatusToConfirmed(appointmentId: string): Promise<void>;
   findDetailsById(appointmentId: string): Promise<IExtendedAppointment | null>;
   findManyByDoctorId(
      doctorId: string,
      offset: number,
      limit: number,
      status?: AppointmentStatus
   ): Promise<PaginatedResult<IAppointment>>;
   findMayByPatientId(
      patientId: string,
      offset: number,
      limit: number,
      status?: AppointmentStatus
   ): Promise<PaginatedResult<IAppointment> | null>;
   findManyByIds(ids: string[]): Promise<IAppointment[] | null>;
}
