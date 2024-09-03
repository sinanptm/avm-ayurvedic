import IDoctor from "../../domain/entities/IDoctor";
import IDoctorRepository from "../../interface/repositories/IDoctorRepository";
import { isValidObjectId } from "../database/isValidObjId";
import DoctorModel from "../database/DoctorModel";

export default class DoctorRepository implements IDoctorRepository {
   model = DoctorModel;
   async findByEmail(email: string): Promise<IDoctor | null> {
      return await this.model.findOne({ email }).select(["-token", "-password"]);
   }
   async findByID(id: string): Promise<IDoctor | null> {
      if (isValidObjectId(id)) throw new Error("Invalid Object Id");

      return await this.model.findById(id).select(["-token", "-password"]);
   }
   async findByEmailWithCredentials(email: string): Promise<IDoctor | null> {
      return await this.model.findOne({ email });
   }
   async create(doctor: IDoctor): Promise<void> {
      try {
         await this.model.create(doctor);
      } catch (error: any) {
         if (error.code === 11000) {
            throw new Error("Doctor with Email Already Exists");
         }
      }
   }
   async findByIdAndUpdate(doctor: IDoctor): Promise<void> {
      if (isValidObjectId(doctor._id!)) throw new Error("Invalid Object Id");
      await this.model.findByIdAndUpdate(doctor._id, doctor, { new: true });
   }
}
