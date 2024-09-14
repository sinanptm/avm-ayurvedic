import { model, Schema } from "mongoose";
import IAppointment, { AppointmentStatus, AppointmentType } from "../../domain/entities/IAppointment";

const appointmentSchema = new Schema<IAppointment>(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',  
      required: true,
      index: true,
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: 'Patient', 
      required: true,
      index: true,
    },
    slotId: {
      type: Schema.Types.ObjectId,
      ref: 'Slot',    
      required: true,
      index: true,
    },
    startTime: {
      type:String,
      required:true
    },
    appointmentType: {
      type: String,
      enum: Object.values(AppointmentType),
      required: true,
    },
    appointmentDate: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      default: null,
    },
    notes: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: Object.values(AppointmentStatus), 
      default: AppointmentStatus.PENDING,
      required: true,
    },
  },
  {
    timestamps: true, 
    versionKey: false, 
    minimize: false,  
  }
);

appointmentSchema.index({ doctorId: 1, patientId: 1, slotId: 1 }, { unique: true });

const AppointmentModel = model<IAppointment>("Appointment", appointmentSchema);
export default AppointmentModel;
