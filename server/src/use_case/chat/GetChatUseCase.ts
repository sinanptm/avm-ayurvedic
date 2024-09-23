import IChat, { IChatWithNotSeenCount } from "../../domain/entities/IChat";
import IMessage from "../../domain/entities/IMessage";
import IChatRepository from "../../domain/interface/repositories/IChatRepository";
import IMessageRepository from "../../domain/interface/repositories/IMessageRepository";
import IValidatorService from "../../domain/interface/services/IValidatorService";
import { PaginatedResult } from "../../types";

export default class GetChatUseCase {
    constructor(
        private messageRepository: IMessageRepository,
        private chatRepository: IChatRepository,
        private validatorService: IValidatorService
    ) { }

    async getAllChatsWithPatientId(patientId: string): Promise<IChatWithNotSeenCount[] | []> {
        this.validatorService.validateIdFormat(patientId);
        const chats = await this.chatRepository.findAllChatsForPatient(patientId);
        return await this.getChatsWithNotSeenMessages(patientId, chats);
    }

    async getAllChatsWithDoctorId(doctorId: string): Promise<IChatWithNotSeenCount[] | []> {
        this.validatorService.validateIdFormat(doctorId);
        const chats = await this.chatRepository.findAllChatsForDoctor(doctorId);
        return await this.getChatsWithNotSeenMessages(doctorId, chats);
    }

    async getMessagesOfChat(chatId: string, limit: number): Promise<PaginatedResult<IMessage>> {
        this.validatorService.validateIdFormat(chatId);
        const offset = 0;
        return await this.messageRepository.findByChatId(chatId, limit, offset);
    }

    private async getChatsWithNotSeenMessages(
        receiverId: string,
        chats: IChatWithNotSeenCount[]
    ): Promise<IChatWithNotSeenCount[] | []> {
        const unreadMessages = await this.messageRepository.getUnreadMessageCountGroupedByChat(receiverId);

        const unreadMessagesMap = unreadMessages.reduce((acc, messageCount) => {
            acc[messageCount._id] = messageCount.count;
            return acc;
        }, {} as { [chatId: string]: number });
    
        const updatedChats = chats.map(chat => ({
            ...chat,
            notSeenMessages: unreadMessagesMap[chat._id!] || 0, 
        }));
        return updatedChats.length ? updatedChats : [];
    }
}