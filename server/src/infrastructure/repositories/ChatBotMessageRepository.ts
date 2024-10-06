import IChatBotMessage from "../../domain/entities/IChatBotMessage";
import IChatBotMessageRepository from "../../domain/interface/repositories/IChatBotMessageRepository";
import ChatbotMessageModel from "../model/ChatBotMessageModel";

export default class ChaBotMessageRepository implements IChatBotMessageRepository {
    model = ChatbotMessageModel;
    async getMessagesByPatientId(patientId: string): Promise<IChatBotMessage[] | []> {
        return await this.model.find({ patientId }).lean(true);
    }
    async create(message: IChatBotMessage): Promise<IChatBotMessage> {
        return await this.model.create(message);
    }
    async delete(id: string): Promise<void> {
        await this.model.deleteOne({id})
    }
}