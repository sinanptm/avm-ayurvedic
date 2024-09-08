import IDoctor from "../../domain/entities/IDoctor";
import IDoctorRepository from "../../domain/interface/repositories/IDoctorRepository";
import { isValidObjectId } from "../database/isValidObjId";
import DoctorModel from "../database/DoctorModel";
import { PaginatedResult } from "../../types";

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
      await this.model.create(doctor);
   }
   async findByIdAndUpdate(doctor: IDoctor): Promise<void> {
      if (!isValidObjectId(doctor._id!)) throw new Error("Invalid Object Id");
      await this.model.findByIdAndUpdate(doctor._id, doctor, { new: true });
   }
   async findMany(offset: number, limit: number): Promise<PaginatedResult<IDoctor>> {
      const totalItems = await this.model.countDocuments();
      const items = await this.model.find().skip(offset).limit(limit).select(['-password','token']);

      const currentPage = Math.floor(limit/offset)+1;
      const totalPages = Math.ceil(totalItems / limit);
      const hasNextPage = currentPage < totalPages;
      const hasPreviousPage = currentPage > 1;
      return {
         currentPage,
         hasNextPage,
         hasPreviousPage,
         items,
         totalItems,
         totalPages,
      };
   }
}
