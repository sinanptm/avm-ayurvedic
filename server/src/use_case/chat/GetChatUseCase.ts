import IChat from "../../domain/entities/IChat";
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

    async getAllChatsWithPatientId(patientId: string): Promise<IChat[]> {
        this.validatorService.validateIdFormat(patientId);
        return await this.chatRepository.findAllChatsForPatient(patientId);
    }
    async getAllChatsWithDoctorId(doctorId: string): Promise<IChat[]> {
        this.validatorService.validateIdFormat(doctorId);
        return await this.chatRepository.findAllChatsForDoctor(doctorId);
    }
    async getMessagesOfChat(chatId:string,limit:number):Promise<PaginatedResult<IMessage>>{
        this.validatorService.validateIdFormat(chatId);
        const offset = 0;
        return await this.messageRepository.findByChatId(chatId,limit,offset);
    }
}