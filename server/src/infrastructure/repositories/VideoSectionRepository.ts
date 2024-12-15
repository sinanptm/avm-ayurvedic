import IVideoSection, { VideoSectionStatus } from "@/domain/entities/IVideoChatSection";
import IVideoSectionRepository from "@/domain/interface/repositories/IVideoSectionRepository";
import VideoSectionModel from "../model/VideoSectionModel";

export default class VideoSectionRepository implements IVideoSectionRepository {
   model = VideoSectionModel;

   async create(videoSection: IVideoSection): Promise<IVideoSection> {
      return await this.model.create(videoSection);
   }

   async findByRoomId(roomId: string): Promise<IVideoSection | null> {
      return await this.model.findOne({ roomId });
   }

   async findById(id: string): Promise<IVideoSection | null> {
      return await this.model.findById(id);
   }

   async update(id: string, videoSection: IVideoSection): Promise<IVideoSection | null> {
      return await this.model.findByIdAndUpdate(id, videoSection, { new: true });
   }

   async findByAppointmentIdAndUpdate(appointmentId: string, videoSection: IVideoSection): Promise<void> {
      await this.model.updateMany({ appointmentId }, { $set: { ...videoSection } });
   }

   async findByPatientIdAndUpdate(patientId: string, section: IVideoSection): Promise<void> {
      await this.model.updateMany({ patientId }, { $set: { ...section } });
   }

   async findByDoctorIdAndUpdate(doctorId: string, section: IVideoSection): Promise<void> {
      await this.model.updateMany({ doctorId }, { $set: { ...section } });
   }

   async delete(id: string): Promise<void> {
      await this.model.findByIdAndDelete(id);
   }

   async findAllSectionsByDoctorId(
      doctorId: string,
      startTime: string,
      status: VideoSectionStatus,
      limit: number
   ): Promise<IVideoSection[] | null> {
      return this.model
         .find({ doctorId, status, startTime: { $gte: startTime } })
         .sort({ startTime: 1 })
         .limit(limit);
   }

   async findByAppointmentId(appointmentId: string): Promise<IVideoSection | null> {
      return await this.model.findOne({ appointmentId });
   }

   async findByStartTimeRangeByDoctorId(
      startTime: string,
      endTime: string,
      doctorId: string
   ): Promise<IVideoSection[] | null> {
      return await this.model.find({
         startTime: { $gte: new Date(startTime), $lte: new Date(endTime) },
         doctorId,
      });
   }

   async findByStartTimeRangeByPatientId(
      startTime: string,
      endTime: string,
      patientId: string
   ): Promise<IVideoSection[] | null> {
      return await this.model.find({
         startTime: { $gte: startTime, $lte: endTime },
         patientId,
      });
   }

   async findByStatus(status: VideoSectionStatus): Promise<IVideoSection | null> {
      return await this.model.findOne({ status });
   }
}
