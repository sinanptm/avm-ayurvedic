import IChat from "../../domain/entities/IChat";
import IChatRepository from "../../domain/interface/repositories/IChatRepository";
import ChatModel from "../model/ChatModel";

export default class ChatRepository implements IChatRepository {
    model = ChatModel;
    async create(chat: IChat): Promise<IChat> {
        return (await this.model.create(chat))
    }
    async findById(id: string): Promise<IChat | null> {
        return await this.model.findById(id).lean(true);
    }
    async update(id: string, chat: IChat): Promise<IChat | null> {
        return await this.model.findByIdAndUpdate({ _id: id }, chat)
    }
    async findByDoctorIdAndUpdate(doctorId: string, chat: IChat): Promise<void> {
        await this.model.updateMany({ doctorId }, chat)
    }
    async findByPatientIdAndUpdate(patientId: string, chat: IChat): Promise<void> {
        await this.model.updateMany({ patientId }, chat)
    }

    async findAllChatsForPatient(patientId: string): Promise<IChat[]> {
        return await this.model.find({ patientId }).sort({ updatedAt: -1 }).lean(true);
    }
    async findAllChatsForDoctor(doctorId: string): Promise<IChat[]> {
        return await this.model.find({ doctorId }).sort({ updatedAt: -1 }).lean(true);
    }

    async findByDoctorAndPatientId(doctorId: string, patientId: string): Promise<IChat | null> {
        return await this.model.findOne({ doctorId, patientId })
    }

}