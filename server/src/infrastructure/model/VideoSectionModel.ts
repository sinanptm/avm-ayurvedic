import { model, Schema } from "mongoose";
import IVideoSection, { VideoSectionStatus } from "../../domain/entities/IVideoChatSection";

const videoSectionSchema = new Schema<IVideoSection>({
    appointmentId: { type: String, required: true, index: true },
    doctorName: { type: String, required: true },
    patientName: { type: String, required: true },
    startTime: { type: Date, required: true, index: true },
    endTime: { type: Date, required: true },
    link: { type: String },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    status: {
        type: String,
        required: true,
        enum: Object.values(VideoSectionStatus),
        default: VideoSectionStatus.PENDING
    },
    doctorProfile: { type: String, required: true },
    patientProfile: { type: String, required: true },
})

const VideoSectionModel = model<IVideoSection>('VideoSection', videoSectionSchema);
export default VideoSectionModel;
