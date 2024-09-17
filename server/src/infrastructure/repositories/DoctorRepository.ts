import IDoctor from "../../domain/entities/IDoctor";
import IDoctorRepository from "../../domain/interface/repositories/IDoctorRepository";
import DoctorModel from "../database/DoctorModel";
import { Types } from 'mongoose'
import { PaginatedResult } from "../../types";
import { getPaginatedResult } from "./getPaginatedResult";

export default class DoctorRepository implements IDoctorRepository {
   model = DoctorModel;
   async findByEmail(email: string): Promise<IDoctor | null> {
      return await this.model.findOne({ email }).select(["-token", "-password"]);
   }
   async findByID(id: string | Types.ObjectId,): Promise<IDoctor | null> {
      return await this.model.findById(id).select(["-token", "-password"]);
   }
   async findByEmailWithCredentials(email: string): Promise<IDoctor | null> {
      return await this.model.findOne({ email });
   }
   async create(doctor: IDoctor): Promise<string> {
      return (await this.model.create(doctor))._id;
   }
   async update(doctor: IDoctor): Promise<IDoctor | null> {
      return await this.model.findByIdAndUpdate(doctor._id, doctor, { new: true });
   }
   async findMany(offset: number, limit: number, isVerified: boolean, isBlocked: boolean): Promise<PaginatedResult<IDoctor>> {
      const totalItems = await this.model.countDocuments({ isVerified, isBlocked });
      const items = await this.model
         .find({ isVerified, isBlocked })
         .skip(offset)
         .limit(limit)
         .select('-password -token');

         return getPaginatedResult(totalItems,offset,limit,items)
   }
}
