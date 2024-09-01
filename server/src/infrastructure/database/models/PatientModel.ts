import { model, Schema } from "mongoose";
import { IPatient } from "../../../domain/entities/Patient";

const patientSchema = new Schema<IPatient>(
   {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
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
   },
   {
      timestamps: true,
   }
);

const PatientModel = model<IPatient>("Patient", patientSchema);
export default PatientModel;
