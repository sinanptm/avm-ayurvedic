import IVideoSection, { VideoSectionStatus } from "../../entities/IVideoChatSection";
import IRepository from "./IRepository";

export default interface IVideoSectionRepository extends IRepository<IVideoSection> {
  findByPatientIdAndUpdate(patientId: string, section: IVideoSection): Promise<void>;
  findByDoctorIdAndUpdate(doctorId: string, section: IVideoSection): Promise<void>;
  findByAppointmentId(appointmentId: string): Promise<IVideoSection | null>;
  findByStatus(status: VideoSectionStatus): Promise<IVideoSection | null>;
  findByStartTimeRangeByDoctorId(startTime: string, endTime: string, doctorId: string): Promise<IVideoSection[] | null>;
  findByStartTimeRangeByPatientId(startTime: string, endTime: string, patientId: string): Promise<IVideoSection[] | null>;
  findAllSectionsByDoctorId(doctorId:string,status:VideoSectionStatus,limit:number):Promise<IVideoSection[] | null>;
  findByAppointmentIdAndUpdate(appointmentId: string, videoSection: IVideoSection): Promise<void>;
}


