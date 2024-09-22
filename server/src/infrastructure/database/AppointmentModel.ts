import { model, Schema } from "mongoose";
import IAppointment, { AppointmentStatus, AppointmentType } from "../../domain/entities/IAppointment";

const appointmentSchema = new Schema<IAppointment>(
   {
      doctorId: {
         type: Schema.Types.ObjectId,
         ref: "Doctor",
         required: true,
         index: true,
      },
      patientId: {
         type: Schema.Types.ObjectId,
         ref: "Patient",
         required: true,
         index: true,
      },
      slotId: {
         type: Schema.Types.ObjectId,
         ref: "Slot",
         required: true,
         index: true,
      },
      appointmentType: {
         type: String,
         enum: Object.values(AppointmentType),
         required: true,
      },
      appointmentDate: { type: String, required: true },
      reason: { type: String, required: true },
      notes: { type: String, default: null },
      status: {
         type: String,
         enum: Object.values(AppointmentStatus),
         default: AppointmentStatus.PENDING,
         required: true,
      },
      paymentId: {
         type: Schema.Types.ObjectId,
         ref: "Payment",
         required: true,
         index: true,
      },
   },
   {
      timestamps: true,
      versionKey: false,
      minimize: false,
   }
);

const AppointmentModel = model<IAppointment>("Appointment", appointmentSchema);
export default AppointmentModel;
