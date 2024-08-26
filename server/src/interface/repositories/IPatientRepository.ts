import { IPatient } from "../../domain/entities/Patient";

export default interface IPatientRepository {
   create(patient: IPatient): Promise<IPatient>;
   update(patient: IPatient): Promise<IPatient | null>;
   changeStatus(id: string, status: boolean): Promise<IPatient | null>;
   findByEmail(email: string): Promise<IPatient | null>;
   findById(id: string): Promise<IPatient | null>;
}
