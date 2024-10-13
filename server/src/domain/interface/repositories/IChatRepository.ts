import IChat from "../../entities/IChat";
import IRepository from "./IRepository";

export default interface IChatRepository extends IRepository<IChat> {
   findAllChatsForPatient(patientId: string): Promise<IChat[]>;
   findAllChatsForDoctor(doctorId: string): Promise<IChat[]>;
   findByDoctorIdAndUpdate(doctorId: string, chat: IChat): Promise<void>;
   findByPatientIdAndUpdate(patientId: string, chat: IChat): Promise<void>;
   findByDoctorAndPatientId(doctorId: string, patientId: string): Promise<IChat | null>;
}
