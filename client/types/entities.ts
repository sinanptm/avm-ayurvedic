import { AppointmentStatus, AppointmentType, Days, NotificationTypes, PrescriptionStatus, VideoSectionStatus } from "./enum";

export interface IPatient {
   readonly _id?: string;
   readonly name?: string;
   readonly email?: string;
   readonly password?: string;
   readonly phone?: string;
   readonly bloodGroup?: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
   readonly dob?: Date;
   readonly isSubscribed?: boolean;
   readonly address?: string;
   readonly profile?: string;
   readonly occupation?: string;
   readonly gender?: "Male" | "Female" | "Other";
   isBlocked?: boolean;
}

export interface IDoctor {
   readonly _id?: string;
   readonly name?: string;
   readonly phone?: string;
   readonly password?: string;
   readonly qualifications?: string[];
   readonly image?: string;
   readonly email?: string;
   readonly updatedAt?: string;
   readonly createdAt?: string;
   isVerified?: boolean;
   isBlocked?: boolean;
}

export interface ISlot {
   readonly _id?: string;
   readonly doctorId?: string;
   readonly day?: Days;
   readonly startTime?: string;
   readonly endTime?: string;
   readonly status?: "available" | "booked";
}

export interface IAppointment {
   readonly _id?: string;
   readonly doctorId?: string;
   readonly patientId?: string;
   readonly slotId?: string;
   readonly createdAt?: string;
   readonly updatedAt?: string;
   readonly appointmentType?: AppointmentType;
   readonly appointmentDate?: string;
   readonly reason?: string;
   readonly notes?: string;
   readonly status?: AppointmentStatus;
}

export interface IExtendedAppointment extends IAppointment {
   readonly patient?: IPatient;
   readonly slot?: ISlot;
   readonly doctor?: IDoctor;
   readonly prescription?: IPrescription;
   readonly isPrescriptionAdded?: boolean;
}

export interface INotification {
   readonly _id?: string;
   readonly patientId?: string;
   readonly doctorId?: string;
   readonly type?: NotificationTypes;
   readonly message?: string;
   readonly createdAt?: Date;
   readonly updatedAt?: Date;
   readonly appointmentId?: string;
}


export interface IChat {
   readonly _id?: string;
   readonly doctorId?: string;
   readonly patientId?: string;
   readonly doctorProfile?: string;
   readonly patientProfile?: string;
   readonly createdAt?: Date;
   readonly updatedAt?: Date;
   readonly doctorName?: string;
   readonly patientName?: string;
   readonly notSeenMessages?: number;
}

export interface IMessage {
   readonly _id?: string;
   readonly chatId?: string;
   readonly senderId?: string;
   readonly receiverId?: string;
   readonly message?: string;
   readonly createdAt?: Date;
   readonly updatedAt?: Date;
   readonly isReceived?: boolean;
}

export interface IVideoSection {
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

export interface IPrescription {
   readonly _id?: string;
   readonly appointmentId?: string;
   readonly doctorId?: string;
   readonly patientId?: string;
   readonly createdAt?: Date;
   readonly updatedAt?: Date;
   readonly medications?: IMedication[];
   readonly status?: PrescriptionStatus;
   readonly notes?: string;
}

export interface IMedication {
   readonly name: string;
   readonly dosage: string;
   readonly frequency: string;
   readonly duration: string;
   readonly additionalInstructions?: string;
}

export interface IChatBotMessage {
   readonly _id?: string;
   readonly patientId?: string;
   readonly message?: string;
   readonly isBotMessage?: boolean;
   readonly createdAt?: Date;
   readonly updatedAt?: Date;
}
