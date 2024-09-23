import IChat from "../../entities/IChat";

export default interface IChatRepository {
   create(chat: IChat): Promise<void>;
   findById(id: string): Promise<IChat | null>;
   findByDoctorIdAndPatientId(doctorId: string, patientId: string): Promise<IChat | null>;
   update({ _id, ...chat }: IChat): Promise<void>;
   findAllChatsForPatient(patientId: string): Promise<IChat[]>;
   findAllChatsForDoctor(doctorId: string): Promise<IChat[]>;
}
