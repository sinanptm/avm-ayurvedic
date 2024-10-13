import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import IChatBotService from "../../domain/interface/services/IChatBotService";
import chatBotConfig from "../../config/chatBotConfig";
import { GEMINI_API_KEY } from "../../config/env";

export default class GeminiBotService implements IChatBotService {
   private genAI: GoogleGenerativeAI;
   private model: GenerativeModel;

   constructor() {
      this.genAI = new GoogleGenerativeAI(GEMINI_API_KEY!);
      this.model = this.genAI.getGenerativeModel({
         model: "gemini-1.5-flash",
         systemInstruction: {
            text: `${chatBotConfig.description}

                **Behavior Rules:**
                ${chatBotConfig.behavior_rules}
                `,
         },
      });
   }

   async generateResponse(userMessage: string): Promise<string> {
      const prompt = `**User Message:** ${userMessage}`;

      const result = await this.model.generateContent({
         contents: [
            {
               role: "user",
               parts: [
                  {
                     text: prompt,
                  },
               ],
            },
         ],
         generationConfig: {
            maxOutputTokens: 1000,
            temperature: 1,
         },
      });

      return result.response.text().trim() || "Sorry, I couldn't process your request.";
   }
}
