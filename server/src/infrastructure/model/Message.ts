import { model, Schema } from "mongoose";
import IMessage from "../../domain/entities/IMessage";

const messageSchema = new Schema<IMessage>(
   {
      chatId: {
         type: Schema.Types.ObjectId,
         ref: "Chat",
         required: true,
         index: true,
      },
      senderId: {
         type: Schema.Types.ObjectId,
         required: true,
      },
      receiverId: {
         type: Schema.Types.ObjectId,
         required: true,
      },
      message: {
         type: String,
         required: true,
      },
      isReceived: {
         type: Boolean,
         default: false,
         required: true,
      },
   },
   {
      timestamps: true,
      versionKey: false,
      minimize: false,
   }
);

messageSchema.index({ senderId: 1, receiverId: 1 });

const MessageModel = model<IMessage>("Message", messageSchema);
export default MessageModel;
