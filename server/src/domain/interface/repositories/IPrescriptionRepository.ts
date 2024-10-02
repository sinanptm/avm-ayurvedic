import IPrescription from "../../entities/IPrescription";
import IRepository from "./IRepository";

export default interface IPrescriptionRepository extends IRepository<IPrescription> {
  findByAppointmentId(appointmentId: string): Promise<IPrescription | null>;
}
