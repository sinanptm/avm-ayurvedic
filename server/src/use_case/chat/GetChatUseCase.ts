import CustomError from "../../domain/entities/CustomError";
import IChat, { IChatWithNotSeenCount } from "../../domain/entities/IChat";
import IMessage from "../../domain/entities/IMessage";
import IChatRepository from "../../domain/interface/repositories/IChatRepository";
import IMessageRepository from "../../domain/interface/repositories/IMessageRepository";
import IValidatorService from "../../domain/interface/services/IValidatorService";
import { PaginatedResult, StatusCode } from "../../types";

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

    async getMessagesOfChat(chatId: string, limit: number): Promise<{ data: PaginatedResult<IMessage>, chat: IChat }> {
        this.validatorService.validateIdFormat(chatId);
        const offset = 0;
        const chat = await this.chatRepository.findById(chatId);
        if (!chat) throw new CustomError("Not found", StatusCode.NotFound);
        const data = await this.messageRepository.findByChatId(chatId, limit, offset);
        return { data, chat }
    }

    private async getChatsWithNotSeenMessages(
        receiverId: string,
        chats: IChat[]
    ): Promise<IChatWithNotSeenCount[] | []> {
        const unreadMessages = await this.messageRepository.getUnreadMessageCountGroupedByChat(receiverId);
        if (!unreadMessages) {
            return chats.map(el => ({ ...el, notSeenMessages: 0 }));
        }
        return chats
    }

}