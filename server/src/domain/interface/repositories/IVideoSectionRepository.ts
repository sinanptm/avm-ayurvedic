import IVideoSection, { VideoSectionStatus } from "../../entities/IVideoChatSection";

export interface IVideoSectionRepository {
  create(videoSection: IVideoSection): Promise<IVideoSection>;
  findById(id: string): Promise<IVideoSection | null>;
  update(id: string, videoSection: IVideoSection): Promise<IVideoSection | null>;
  delete(id: string): Promise<void>;
  findByAppointmentId(appointmentId: string): Promise<IVideoSection | null>;
  findByStatus(status: VideoSectionStatus): Promise<IVideoSection | null>;
  findByStartTimeRangeByDoctorId(startTime: string, endTime: string, doctorId: string): Promise<IVideoSection[] | null>;
  findByStartTimeRangeByPatientId(startTime: string, endTime: string, patientId: string): Promise<IVideoSection[] | null>;
}


