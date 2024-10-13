import IChatBotMessage from "../../domain/entities/IChatBotMessage";
import IChatBotMessageRepository from "../../domain/interface/repositories/IChatBotMessageRepository";
import IChatBotService from "../../domain/interface/services/IChatBotService";
import IValidatorService from "../../domain/interface/services/IValidatorService";

export default class ChatBotUseCase {
   constructor(
      private chatBotMessageRepository: IChatBotMessageRepository,
      private chatBotService: IChatBotService,
      private validatorService: IValidatorService
   ) {}

   async createMessage(patientId: string, patientMessage: string): Promise<IChatBotMessage[]> {
      this.validatorService.validateRequiredFields({ patientMessage, patientId });
      this.validatorService.validateIdFormat(patientId);
      const botResponse = await this.chatBotService.generateResponse(patientMessage);
      await this.chatBotMessageRepository.create({ patientId, message: patientMessage, isBotMessage: false });
      const botMessage = await this.chatBotMessageRepository.create({
         patientId,
         message: botResponse,
         isBotMessage: true,
      });
      return [botMessage];
   }

   async getMessages(patientId: string): Promise<IChatBotMessage[]> {
      this.validatorService.validateIdFormat(patientId);
      let limit = 40;
      const messages = await this.chatBotMessageRepository.getMessagesByPatientId(patientId, limit);
      if (messages.length > limit) {
         const ids = messages.map((message) => message._id!);
         await this.chatBotMessageRepository.deleteNotInId(ids);
      }
      return messages;
   }
}
