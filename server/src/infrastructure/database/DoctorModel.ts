import { model, Schema } from "mongoose";
import IDoctor from "../../domain/entities/IDoctor";

const doctorSchema = new Schema<IDoctor>(
   {
      email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
      password: { type: String },
      image: { type: String, default: "" },
      isBlocked: { type: Boolean, default: false },
      name: { type: String, default: "" },
      phone: { type: String },
      role: { type: String, enum: ["admin", "doctor"], default: "doctor" },
      qualifications: { type: [String] },
      token: { type: String, default: "" },
      isVerified: { type: Boolean, default: false },
   },
   {
      timestamps: true,
      versionKey: false,
   }
);
doctorSchema.index({ email: 1 });

const DoctorModel = model<IDoctor>("Doctor", doctorSchema);
export default DoctorModel;
