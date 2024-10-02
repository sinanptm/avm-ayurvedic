export default interface IVideoSection {
  readonly _id?: string;
  readonly appointmentId?: string;
  readonly doctorName?: string;
  readonly patientName?: string;
  readonly doctorProfile?: string;
  readonly doctorId?: string;
  readonly patientProfile?: string;
  readonly patientId?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly startTime?: Date | string;
  readonly endTime?: Date | string;
  readonly roomId?: string;
  readonly status?: VideoSectionStatus;
}

export enum VideoSectionStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}
