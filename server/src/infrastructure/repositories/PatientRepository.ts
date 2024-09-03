import { IPatient } from "../../domain/entities/Patient";
import IPatientRepository from "../../interface/repositories/IPatientRepository";
import { isValidObjectId } from "../database/isValidObjId";
import PatientModel from "../database/models/PatientModel";

export default class PatientRepository implements IPatientRepository {
   model = PatientModel;
   async create(patient: IPatient): Promise<IPatient | never> {
      try {
         const patientModel = new this.model(patient);
         return await patientModel.save();
      } catch (error: any) {
         if (error.code === 11000) {
            throw new Error("Patient With Email Already Exists");
         }
         throw error;
      }
   }
   async update(patient: IPatient): Promise<IPatient | null> {
      return await this.model.findByIdAndUpdate(patient._id, patient, { new: true });
   }
   async changeStatus(id: string, status: boolean): Promise<IPatient | null> {
      return await this.model.findByIdAndUpdate(id, { $set: { isBlocked: !status } });
   }
   async findByEmail(email: string): Promise<IPatient | null> {
      return await this.model.findOne({ email }).select(["-password","-token"]);
   }
   async findByIdAndUpdate(id:string,patient: IPatient): Promise<IPatient | null> {
      return await this.model.findByIdAndUpdate(id, patient, { new: true });
   }
   async findById(id: string): Promise<IPatient | null> {
      if (!isValidObjectId(id)) {
         throw new Error(`Invalid Object id : ${id}`);
      }
      return await this.model.findById(id).select(["-password","-token"]);
   }
   async findByEmailWithCredentials(email: string): Promise<IPatient | null> {
      return await this.model.findOne({ email });
   }
}
