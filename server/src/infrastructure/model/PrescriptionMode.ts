import { model, Schema } from "mongoose";
import IPrescription, { IMedication, PrescriptionStatus } from "../../domain/entities/IPrescription";

const medicationSchema = new Schema<IMedication>(
   {
      name: { type: String, required: true },
      dosage: { type: String, required: true },
      frequency: { type: String, required: true },
      duration: { type: String, required: true },
      additionalInstructions: { type: [String] },
   },
   { _id: false }
);

const prescriptionSchema = new Schema<IPrescription>(
   {
      appointmentId: {
         type: Schema.Types.ObjectId,
         ref: "Appointment",
         required: true,
         unique: true,
         index: true,
      },
      doctorId: {
         type: Schema.Types.ObjectId,
         ref: "Doctor",
         required: true,
      },
      patientId: {
         type: Schema.Types.ObjectId,
         ref: "Patient",
         required: true,
      },
      notes: {
         type: String,
      },
      status: {
         type: String,
         enum: Object.values(PrescriptionStatus),
         required: true,
         default: PrescriptionStatus.PENDING,
      },
      medications: {
         type: [medicationSchema],
         required: true,
      },
   },
   {
      timestamps: true,
      versionKey: false,
      minimize: false,
   }
);

const PrescriptionModel = model<IPrescription>("Prescription", prescriptionSchema);
export default PrescriptionModel;
