import IChatBotMessage from "../../domain/entities/IChatBotMessage";
import IChatBotMessageRepository from "../../domain/interface/repositories/IChatBotMessageRepository";
import ChatbotMessageModel from "../model/ChatBotMessageModel";

export default class ChaBotMessageRepository implements IChatBotMessageRepository {
   model = ChatbotMessageModel;
   async getMessagesByPatientId(patientId: string, limit: number): Promise<IChatBotMessage[] | []> {
      return await this.model.find({ patientId }).limit(limit).lean(true);
   }
   async create(message: IChatBotMessage): Promise<IChatBotMessage> {
      return await this.model.create(message);
   }
   async deleteNotInId(ids: string[]): Promise<void> {
      await this.model.deleteMany({ _id: { $nin: ids } });
   }
   async delete(id: string): Promise<void> {
      throw new Error("Method not implemented.");
   }
   findById(id: string): Promise<IChatBotMessage | null> {
      throw new Error("Method not implemented.");
   }
   update(id: string, entity: IChatBotMessage): Promise<IChatBotMessage | null> {
      throw new Error("Method not implemented.");
   }
}
