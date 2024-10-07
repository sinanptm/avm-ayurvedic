import CustomError from "../../domain/entities/CustomError";
import IPatient  from "../../domain/entities/IPatient";
import IPatientRepository from "../../domain/interface/repositories/IPatientRepository";
import { PaginatedResult, StatusCode } from "../../types";
import { PatientGenderStatics } from "../../types/statics";
import PatientModel from "../model/PatientModel";
import { getPaginatedResult } from "./getPaginatedResult";

export default class PatientRepository implements IPatientRepository {
   model = PatientModel;

   async findMany(offset: number, limit: number): Promise<PaginatedResult<IPatient>> {
      const totalItems = await this.model.countDocuments();
      const items = await this.model.find()
         .skip(limit * offset)
         .limit(limit)
         .select(["-token", "-password"])
         .exec();
      return getPaginatedResult(totalItems, offset, limit, items);
   }

   async getCountInTimeRange(startTime: Date, endTime: Date): Promise<number> {
      const result = await this.model.aggregate([
         {
            $match: {
               createdAt: { $gte: startTime, $lte: endTime }
            }
         },
         {
            $group: {
               _id: null, 
               count: { $sum: 1 }
            }
         }
      ]);

      return result.length > 0 ? result[0].count : 0;
   };

   async create(patient: IPatient): Promise<IPatient> {
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
   async findAll(): Promise<IPatient[] | []> {
      return await this.model.find().select(["-password", "-token"]);
   }
   async update(id: string, patient: IPatient): Promise<IPatient | null> {
      return await this.model.findByIdAndUpdate(id, patient, { new: true });
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
   async findPatientGenders(): Promise<PatientGenderStatics> {
      const counts = await this.model.aggregate([
        {
          $group: {
            _id: "$gender",
            count: { $sum: 1 },
          },
        },
      ]);
      const initialCounts: PatientGenderStatics = {
        male: 0,
        female: 0,
        others: 0,
      };
    
      counts.forEach((item) => {
        if (item._id === "Male") {
          initialCounts.male = item.count;
        } else if (item._id === "Female") {
          initialCounts.female = item.count;
        } else {
          initialCounts.others = item.count;
        }
      });
      return initialCounts;
    }
   
}
