import { IPatient } from "../../../domain/entities/Patient";
import IPatientRepository from "../../../interface/repositories/IPatientRepository";
import { isValidObjectId } from "../isValidObjId";
import PatientModel from "../models/PatientModel";

export default class PatientRepository implements IPatientRepository {
   model = PatientModel;
   async create(patient: IPatient): Promise<IPatient> {
      const patientModel = new this.model(patient);
      return await patientModel.save();
   }
   async update(patient: IPatient): Promise<IPatient | null> {
      return await this.model.findByIdAndUpdate(patient._id, patient, { new: true });
   }
   async changeStatus(id: string, status: boolean): Promise<IPatient | null> {
      return await this.model.findByIdAndUpdate(id, { $set: { isBlocked: !status } });
   }
   async findByEmail(email: string): Promise<IPatient | null> {
      return await this.model.findOne({ email });
   }
   async findById(id: string): Promise<IPatient | null> {
      if (!isValidObjectId(id)) {
         throw new Error(`Invalid Object id : ${id}`);
      }
      return await this.model.findById(id);
   }
}
