import { model, Schema } from "mongoose";
import IChatBotMessage from "../../domain/entities/IChatBotMessage";

const chatbotMessageSchema = new Schema<IChatBotMessage>({
    patientId: {
        type: Schema.Types.ObjectId,
        ref: "Patient", 
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    isBotMessage: {
        type: Boolean,
        default: false,  
        required: true,
    },
}, {
    timestamps: true,  
    versionKey: false,
    minimize: false,
});

chatbotMessageSchema.index({ patientId: 1 });

const ChatbotMessageModel = model<IChatBotMessage>("ChatbotMessage", chatbotMessageSchema);

export default ChatbotMessageModel;
