import { model, Schema } from "mongoose";
import { Days, ISlot } from "../../domain/entities/ISlot";

const slotSchema = new Schema<ISlot>(
    {
        doctorId: {
            type:  Schema.Types.ObjectId,
            ref: 'Doctor',
            required: true,
            index: true
        },
        day: {
            type: String,
            enum: Object.values(Days),
            required: true,
            index: true
        },
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["available", "booked"],
            required: true,
            default: "available"
        }
    },
    {
        timestamps: true,
        versionKey: false,
        minimize: false
    }
);

slotSchema.index({ doctorId: 1, day: 1, startTime: 1 }, { unique: true });

const SlotModel = model<ISlot>("Slot", slotSchema);
export default SlotModel;
