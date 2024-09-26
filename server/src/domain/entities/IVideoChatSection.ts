export default interface IVideoSection {
  _id: string;
  appointmentId: string;
  doctorName: string;
  patientName: string;
  createdAt: Date;
  updatedAt: Date;
  messages: IVideoChatMessage[];
  startTime: Date | string;
  endTime: Date | string;
  link: string;

}

export enum VideoSectionStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export interface IVideoChatMessage {
  _id: string;
  sender: string;
  message: string;
  timestamp: Date;
}

