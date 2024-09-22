import IPatient  from "../../entities/IPatient";
import { PaginatedResult } from "../../../types";

export default interface IPatientRepository {
   create(patient: IPatient): Promise<IPatient | never>;
   update(patient: IPatient): Promise<IPatient | null>;
   findByIdAndUpdate(id: string, patient: IPatient): Promise<IPatient | null>;
   findByEmail(email: string): Promise<IPatient | null>;
   findById(id: string): Promise<IPatient | null>;
   findByEmailWithCredentials(email: string): Promise<IPatient | null>;
   findMany(offset: number, limit: number): Promise<PaginatedResult<IPatient>>;
}
