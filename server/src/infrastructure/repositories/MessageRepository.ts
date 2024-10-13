import IMessage from "../../domain/entities/IMessage";
import IMessageRepository from "../../domain/interface/repositories/IMessageRepository";
import MessageModel from "../model/Message";
import { ObjectId } from "mongodb";

export default class MessageRepository implements IMessageRepository {
   model = MessageModel;
   async create(message: IMessage): Promise<IMessage> {
      return await this.model.create(message);
   }
   async findById(_id: string): Promise<IMessage | null> {
      return await this.model.findById(_id);
   }
   async update(id: string, message: IMessage): Promise<IMessage | null> {
      return await this.model.findByIdAndUpdate(id, message);
   }
   async findByChatId(chatId: string): Promise<IMessage[] | []> {
      return await this.model.find({ chatId }).sort({ createdAt: 1 });
   }
   async markAsReadByReceiverAndChatId(receiverId: string, chatId: string): Promise<void> {
      await this.model.updateMany({ chatId, receiverId, isReceived: false }, { $set: { isReceived: true } });
   }
   async getUnreadMessageCountGroupedByChat(receiverId: string): Promise<{ _id: string; count: number }[]> {
      return await this.model
         .aggregate([
            { $match: { receiverId: new ObjectId(receiverId), isReceived: false } },
            { $group: { _id: "$chatId", count: { $sum: 1 } } },
         ])
         .exec();
   }
}
