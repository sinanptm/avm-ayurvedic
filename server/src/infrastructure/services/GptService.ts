import { OpenAI } from 'openai';
import IChatBotService from "../../domain/interface/services/IChatBotService";
import chatBotConfig from '../../config/chatBotConfig';
import { OPEN_AI_API_KEY } from '../../config/env';

export default class GptService implements IChatBotService {
    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: OPEN_AI_API_KEY,
        });
    }

    async generateResponse(userMessage: string): Promise<string> {
        const response = await this.openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `${chatBotConfig.description} Behavior rules: ${chatBotConfig.behavior_rules.join(' ')}`
                },
                {
                    role: 'user',
                    content: userMessage,
                }
            ],
        });

        return response.choices[0].message.content?.trim() || "Sorry, I couldn't process your request.";
    }
}
