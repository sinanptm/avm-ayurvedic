import IMessage from "../../entities/IMessage";
import { PaginatedResult } from "../../../types";
import IRepository from "./IRepository";

export default interface IMessageRepository extends IRepository<IMessage> {
   findByChatId(chatId: string): Promise<IMessage[]|[]>;
   markAsReadByReceiverAndChatId(receiverId: string, chatId: string): Promise<void>;
   getUnreadMessageCountGroupedByChat(receiverId: string): Promise<{ _id: string, count: number }[]>;
}
