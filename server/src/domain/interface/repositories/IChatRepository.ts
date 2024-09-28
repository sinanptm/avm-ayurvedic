import IChat from "../../entities/IChat";

export default interface IChatRepository {
   create(chat: IChat): Promise<string>;
   findById(id: string): Promise<IChat | null>;
   update({ _id, ...chat }: IChat): Promise<void>;
   findAllChatsForPatient(patientId: string): Promise<IChat[]>;
   findAllChatsForDoctor(doctorId: string): Promise<IChat[]>;
   findByDoctorIdAndUpdate(doctorId: string, chat: IChat): Promise<void>;
   findByPatientIdAndUpdate(patientId: string, chat: IChat): Promise<void>;
   findByDoctorAndPatientId(doctorId:string,patientId:string):Promise<IChat|null>
}
