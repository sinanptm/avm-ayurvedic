import IPatient  from "../../entities/IPatient";
import { PaginatedResult } from "../../../types";
import IRepository from "./IRepository";
import { PatientGenderStatics } from "../../../types/statics";

export default interface IPatientRepository extends IRepository<IPatient> {
   findByEmail(email: string): Promise<IPatient | null>;
   findByEmailWithCredentials(email: string): Promise<IPatient | null>;
   findMany(offset: number, limit: number): Promise<PaginatedResult<IPatient>>;
   findAll(): Promise<IPatient[] | []>;
   findPatientGenders():Promise<PatientGenderStatics>;
}
