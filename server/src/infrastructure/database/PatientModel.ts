import { model, Schema } from "mongoose";
import { IPatient } from "../../domain/entities/IPatient";

const patientSchema = new Schema<IPatient>(
   {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
      phone: { type: String },
      password: { type: String },
      bloodGroup: { type: String },
      address: { type: String },
      dob: { type: Date },
      isBlocked: { type: Boolean, default: false },
      isSubscribed: { type: Boolean, default: false },
      token: { type: String },
      profile: { type: String },
      occupation: { type: String },
      gender: { type: String, enum: ["Male", "Female", "Other"] },
   },
   {
      timestamps: true,
      versionKey: false,
   }
);

patientSchema.index({ email: 1 });

const PatientModel = model<IPatient>("Patient", patientSchema);
export default PatientModel;
