import { model, Schema } from "mongoose";
import IDoctor from "../../domain/entities/IDoctor";

const doctorSchema = new Schema<IDoctor>(
   {
      email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
      password: { type: String },
      image: { type: String, default: "" },
      isBlocked: { type: Boolean, default: false },
      name: { type: String, default: "" },
      phone: { type: String, unique: true },
      role: { type: String, enum: ["admin", "doctor"], default: "doctor" },
      qualification: { type: [String] },
      token: { type: String, default: "" },
   },
   {
      timestamps: true,
   }
);
doctorSchema.index({ email: 1 });

const DoctorModel = model<IDoctor>("Doctor", doctorSchema);
export default DoctorModel;
