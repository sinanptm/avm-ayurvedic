import CustomError from "../../domain/entities/CustomError";
import IPatient  from "../../domain/entities/IPatient";
import IPatientRepository from "../../domain/interface/repositories/IPatientRepository";
import { PaginatedResult, StatusCode } from "../../types";
import PatientModel from "../database/PatientModel";
import { getPaginatedResult } from "./getPaginatedResult";

export default class PatientRepository implements IPatientRepository {
   model = PatientModel;

   async findMany(offset: number, limit: number): Promise<PaginatedResult<IPatient>> {
      const totalItems = await this.model.countDocuments();
      const items = await this.model.find().skip(offset).limit(limit).select(["-token", "-password"]).exec();

      return getPaginatedResult(totalItems, offset, limit, items);
   }

   async create(patient: IPatient): Promise<IPatient | never> {
      try {
         const patientModel = new this.model(patient);
         return await patientModel.save();
      } catch (error: any) {
         if (error.code === 11000) {
            throw new CustomError("Email Already Exists", StatusCode.Conflict);
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
      return await this.model.findByIdAndUpdate(id, patient, { new: true });
   }
   async findById(id: string): Promise<IPatient | null> {
      return await this.model.findById(id).select(["-password", "-token"]);
   }
   async findByEmailWithCredentials(email: string): Promise<IPatient | null> {
      return await this.model.findOne({ email });
   }
}
