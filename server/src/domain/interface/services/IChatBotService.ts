export default interface IChatBotService {
   generateResponse(userMessage: string): Promise<string>;
}
