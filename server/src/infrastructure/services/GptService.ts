import IChatBotService from "../../domain/interface/services/IChatBotService";
import { OPEN_AI_API_KEY, OPEN_AI_PROJECT_ID, OPEN_AI_ORGANIZATION_ID } from '../../config/env';

export default class GptService implements IChatBotService {
    generateResponse(userMessage: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
}