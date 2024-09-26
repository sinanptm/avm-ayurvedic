import IVideoSection, { VideoSectionStatus } from "../../domain/entities/IVideoChatSection";
import { IVideoSectionRepository } from "../../domain/interface/repositories/IVideoSectionRepository";
import VideoSectionModel from "../model/VideoSectionModel";

export default class VideoSectionRepository implements IVideoSectionRepository {
    model = VideoSectionModel;

    async create(videoSection: IVideoSection): Promise<IVideoSection> {
        return await this.model.create(videoSection);
    }

    async findById(id: string): Promise<IVideoSection | null> {
        return await this.model.findById(id);
    }

    async update(id: string, videoSection: IVideoSection): Promise<IVideoSection | null> {
        return await this.model.findByIdAndUpdate(id, videoSection, { new: true });
    }

    async delete(id: string): Promise<void> {
        await this.model.findByIdAndDelete(id);
    }

    async findByAppointmentId(appointmentId: string): Promise<IVideoSection | null> {
        return await this.model.findOne({ appointmentId });
    }
    
    async findByStartTimeRange(startTime: string, endTime: string): Promise<IVideoSection[] | null> {
        return await this.model.find({
            startTime: { $gte: startTime, $lte: endTime }
        });
    }

    async findByStatus(status: VideoSectionStatus): Promise<IVideoSection | null> {
        return await this.model.findOne({ status });
    }
}