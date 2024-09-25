import IMessage from "../../entities/IMessage";
import { PaginatedResult } from "../../../types";

export default interface IMessageRepository {
   create(message: IMessage): Promise<void>;
   findById(_id: string): Promise<IMessage | null>;
   findByChatId(chatId: string, limit: number, offset: number): Promise<PaginatedResult<IMessage>>;
   markAsReadByReceiverAndChatId(receiverId: string, chatId: string): Promise<void>;
   getUnreadMessageCountGroupedByChat(receiverId: string): Promise<{ _id: string, count: number }[]>;
}
