import IMessageRepository from "../../domain/interface/repositories/IMessageRepository";
import IPatientRepository from "../../domain/interface/repositories/IPatientRepository";
import IChatRepository from "../../domain/interface/repositories/IChatRepository";
import IValidatorService from "../../domain/interface/services/IValidatorService";
import CustomError from "../../domain/entities/CustomError";
import { PaginatedResult, StatusCode } from "../../types";
import IMessage from "../../domain/entities/IMessage";
import IPatient from "../../domain/entities/IPatient";
import IChat from "../../domain/entities/IChat";

export default class GetChatUseCase {
    constructor(
        private messageRepository: IMessageRepository,
        private chatRepository: IChatRepository,
        private validatorService: IValidatorService,
        private patientRepository: IPatientRepository
    ) { }

    async getAllChatsWithPatientId(patientId: string): Promise<IChat[] | []> {
        this.validatorService.validateIdFormat(patientId);
        const chats = await this.chatRepository.findAllChatsForPatient(patientId);
        return await this.getChatsWithNotSeenMessages(patientId, chats);
    }

    async getAllChatsWithDoctorId(doctorId: string): Promise<IChat[] | []> {
        this.validatorService.validateIdFormat(doctorId);
        const chats = await this.chatRepository.findAllChatsForDoctor(doctorId);
        return await this.getChatsWithNotSeenMessages(doctorId, chats);
    }

    async getPatientsDoctor(): Promise<IPatient[] | []> {
        const patients = await this.patientRepository.findAll()!;
        return patients.filter(patient => patient.profile && patient.name);
    }

    private async getChatsWithNotSeenMessages(
        receiverId: string,
        chats: IChat[]
    ): Promise<IChat[] | []> {
        const unreadMessages = await this.messageRepository.getUnreadMessageCountGroupedByChat(receiverId);       
        if(unreadMessages.length === 0) return chats.map(chat=>({...chat,notSeenMessages:0}));
        
        const map = new Map<string,number>()
        unreadMessages.forEach(({_id,count})=>{
            map.set(_id.toString(),count);
        })
        const result = chats.map(chat => ({
            ...chat,
            notSeenMessages: map.get(chat._id?.toString()!) || 0 
        }));
        return result;
    }

    async getMessagesOfChat(chatId: string, limit: number, receiverId: string): Promise<{ data: PaginatedResult<IMessage>, chat: IChat }> {
        this.validatorService.validateIdFormat(chatId);
        const offset = 0;
        const chat = await this.chatRepository.findById(chatId);
        await this.messageRepository.markAsReadByReceiverAndChatId(receiverId, chatId);
        if (!chat) throw new CustomError("Not found", StatusCode.NotFound);
        const data = await this.messageRepository.findByChatId(chatId, limit, offset);
        return { data, chat }
    }

}