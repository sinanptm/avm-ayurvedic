import IChat from "../../domain/entities/IChat";
import IChatRepository from "../../domain/interface/repositories/IChatRepository";
import ChatModel from "../model/ChatModel";

export default class ChatRepository implements IChatRepository {
    model = ChatModel;
    async create(chat: IChat): Promise<string> {
        return (await this.model.create(chat))._id
    }
    async findById(id: string): Promise<IChat | null> {
        return await this.model.findById(id)
    }
    async update({ _id, ...chat }: IChat): Promise<void> {
        await this.model.findByIdAndUpdate({ _id }, chat)
    }
    async findByDoctorIdAndUpdate(doctorId: string, chat: IChat): Promise<void> {
        await this.model.updateMany({ doctorId }, chat)
    }
    async findByPatientIdAndUpdate(patientId: string, chat: IChat): Promise<void> {
        await this.model.updateMany({ patientId }, chat )
    }

    async findAllChatsForPatient(patientId: string): Promise<IChat[]> {
        return await this.model.find({ patientId });
    }
    async findAllChatsForDoctor(doctorId: string): Promise<IChat[]> {
        return await this.model.find({ doctorId });
    }

    async findByDoctorAndPatientId(doctorId: string, patientId: string): Promise<IChat | null> {
        return await this.model.findOne({ doctorId, patientId })
    }

}