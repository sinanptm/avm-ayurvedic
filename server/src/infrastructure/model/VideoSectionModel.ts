import { model, Schema } from "mongoose";
import IVideoSection, { VideoSectionStatus } from "@/domain/entities/IVideoChatSection";

const videoSectionSchema = new Schema<IVideoSection>(
   {
      appointmentId: {
         type: Schema.Types.ObjectId,
         ref: "Appointment",
         required: true,
         index: true,
         unique: true,
      },
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
      doctorName: { type: String, required: true },
      patientName: { type: String, required: true },
      startTime: { type: Date, required: true, index: true },
      endTime: { type: Date, required: true },
      roomId: { type: String },
      status: {
         type: String,
         required: true,
         enum: Object.values(VideoSectionStatus),
         default: VideoSectionStatus.PENDING,
      },
      doctorProfile: { type: String, required: true },
      patientProfile: { type: String, required: true },
   },
   {
      timestamps: true,
      versionKey: false,
      minimize: false,
   }
);

const VideoSectionModel = model<IVideoSection>("VideoSection", videoSectionSchema);
export default VideoSectionModel;
