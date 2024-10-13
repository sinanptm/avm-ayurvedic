import IMessageRepository from "../../domain/interface/repositories/IMessageRepository";
import IPatientRepository from "../../domain/interface/repositories/IPatientRepository";
import IChatRepository from "../../domain/interface/repositories/IChatRepository";
import IValidatorService from "../../domain/interface/services/IValidatorService";
import CustomError from "../../domain/entities/CustomError";
import IMessage from "../../domain/entities/IMessage";
import IPatient from "../../domain/entities/IPatient";
import IChat from "../../domain/entities/IChat";
import { StatusCode } from "../../types";

export default class GetChatUseCase {
   constructor(
      private messageRepository: IMessageRepository,
      private chatRepository: IChatRepository,
      private validatorService: IValidatorService,
      private patientRepository: IPatientRepository
   ) {}

   async isAuthorizedInChat(chatId: string, userId: string): Promise<boolean> {
      this.validatorService.validateIdFormat(chatId);
      const chat = await this.chatRepository.findById(chatId);
      if (!chat) {
         return false;
      } else if (chat.doctorId?.toString() === userId) {
         return true;
      } else if (chat.patientId?.toString() === userId) {
         return true;
      } else {
         return false;
      }
   }

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
      return patients.filter((patient) => patient.profile && patient.name);
   }

   async getMessagesOfChat(chatId: string): Promise<{ messages: IMessage[] | []; chat: IChat }> {
      this.validatorService.validateIdFormat(chatId);
      const chat = await this.chatRepository.findById(chatId);
      if (!chat) throw new CustomError("Not found", StatusCode.NotFound);
      const messages = await this.messageRepository.findByChatId(chatId);
      return { messages, chat };
   }

   async markReceived(chatId: string, receiverId: string): Promise<void> {
      this.validatorService.validateMultipleIds([receiverId, chatId]);
      await this.messageRepository.markAsReadByReceiverAndChatId(receiverId, chatId);
   }

   private async getChatsWithNotSeenMessages(receiverId: string, chats: IChat[]): Promise<IChat[] | []> {
      const unreadMessages = await this.messageRepository.getUnreadMessageCountGroupedByChat(receiverId);
      if (unreadMessages.length === 0) return chats.map((chat) => ({ ...chat, notSeenMessages: 0 }));

      const map = new Map<string, number>();
      unreadMessages.forEach(({ _id, count }) => {
         map.set(_id.toString(), count);
      });
      const result = chats.map((chat) => ({
         ...chat,
         notSeenMessages: map.get(chat._id?.toString()!) || 0,
      }));
      return result;
   }
}
