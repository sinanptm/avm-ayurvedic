export enum PrescriptionStatus {
  PENDING = 'pending',
  ISSUED = 'issued',
  CANCELLED = 'cancelled',
}

export default interface IPrescription {
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
