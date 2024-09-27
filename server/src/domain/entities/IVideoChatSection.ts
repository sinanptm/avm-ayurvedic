export default interface IVideoSection {
  _id?: string;
  appointmentId?: string;
  doctorName?: string;
  patientName?: string;
  doctorProfile?: string;
  doctorId?: string;
  patientProfile?: string;
  patientId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  startTime?: Date | string;
  endTime?: Date | string;
  link?: string;
  status?: VideoSectionStatus;
}

export enum VideoSectionStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}
