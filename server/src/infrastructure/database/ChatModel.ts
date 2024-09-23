import { model, Schema } from "mongoose";
import IChat from "../../domain/entities/IChat";


const chatSchema = new Schema<IChat>({
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
        index: true,
    },
    patientId: {
        type: Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
        index: true,
    },
},
    {
        timestamps: true,
        versionKey: false,
        minimize: false,
    }
);

chatSchema.index({ doctorId: 1, patientId: 1 }, { unique: true })
const ChatModel = model<IChat>("Chat", chatSchema);
export default ChatModel;