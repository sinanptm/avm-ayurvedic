import { IPatient } from "../../domain/entities/IPatient";
import IPatientRepository from "../../domain/interface/repositories/IPatientRepository";
import { PaginatedResult } from "../../types";
import { isValidObjectId } from "../database/isValidObjId";
import PatientModel from "../database/PatientModel";

export default class PatientRepository implements IPatientRepository {
   model = PatientModel;

   async findMany(offset: number, limit: number): Promise<PaginatedResult<IPatient>> {
      const totalItems = await this.model.countDocuments();
      const items = await this.model.find().skip(offset).limit(limit).select(["-token", "-password"]).exec();

      const currentPage = Math.floor(offset / limit) + 1;
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

   async create(patient: IPatient): Promise<IPatient | never> {
      try {
         const patientModel = new this.model(patient);
         return await patientModel.save();
      } catch (error: any) {
         if (error.code === 11000) {
            throw new Error("Email Already Exists");
         }
         throw error;
      }
   }
   async update(patient: IPatient): Promise<IPatient | null> {
      return await this.model.findByIdAndUpdate(patient._id, patient, { new: true });
   }
   async findByEmail(email: string): Promise<IPatient | null> {
      return await this.model.findOne({ email }).select(["-password", "-token"]);
   }
   async findByIdAndUpdate(id: string, patient: IPatient): Promise<IPatient | null> {
      if (!isValidObjectId(id)) throw new Error("Invalid Object Id");
      return await this.model.findByIdAndUpdate(id, patient, { new: true });
   }
   async findById(id: string): Promise<IPatient | null> {
      if (!isValidObjectId(id)) {
         throw new Error(`Invalid Object Id`);
      }
      return await this.model.findById(id).select(["-password", "-token"]);
   }
   async findByEmailWithCredentials(email: string): Promise<IPatient | null> {
      return await this.model.findOne({ email });
   }
}
