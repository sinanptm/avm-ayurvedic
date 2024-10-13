import IDoctor from "../../domain/entities/IDoctor";
import IDoctorRepository from "../../domain/interface/repositories/IDoctorRepository";
import DoctorModel from "../model/DoctorModel";
import { PaginatedResult } from "../../types";
import { getPaginatedResult } from "./getPaginatedResult";

export default class DoctorRepository implements IDoctorRepository {
   model = DoctorModel;
   async findByEmail(email: string): Promise<IDoctor | null> {
      return await this.model.findOne({ email }).select(["-token", "-password"]);
   }
   async findById(id: string): Promise<IDoctor | null> {
      return await this.model.findById(id).select(["-token", "-password"]);
   }
   async findByEmailWithCredentials(email: string): Promise<IDoctor | null> {
      return await this.model.findOne({ email });
   }
   async create(doctor: IDoctor): Promise<IDoctor> {
      return await this.model.create(doctor);
   }
   async update(id: string, doctor: IDoctor): Promise<IDoctor | null> {
      return await this.model.findByIdAndUpdate(id, doctor, { new: true });
   }
   async findMany(
      offset: number,
      limit: number,
      isVerified: boolean,
      isBlocked: boolean
   ): Promise<PaginatedResult<IDoctor>> {
      const totalItems = await this.model.countDocuments({ isVerified, isBlocked });
      const items = await this.model
         .find({ isVerified, isBlocked })
         .skip(limit * offset)
         .limit(limit)
         .select(["-password", "-token", "-createdAt", "-updatedAt"]);
      return getPaginatedResult(totalItems, offset, limit, items);
   }
   async getCountInTimeRange(startTime: Date, endTime: Date): Promise<number> {
      const result = await this.model.aggregate([
         {
            $match: {
               createdAt: { $gte: startTime, $lte: endTime },
            },
         },
         {
            $group: {
               _id: null,
               count: { $sum: 1 },
            },
         },
      ]);

      return result.length > 0 ? result[0].count : 0;
   }
}
