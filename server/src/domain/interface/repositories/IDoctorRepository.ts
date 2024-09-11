import { PaginatedResult } from "../../../types";
import IDoctor from "../../entities/IDoctor";

export default interface IDoctorRepository {
   findByEmail(email: string): Promise<IDoctor | null>;
   findByID(id: string): Promise<IDoctor | null>;
   findByEmailWithCredentials(email: string): Promise<IDoctor | null>;
   create(doctor: IDoctor): Promise<string>;
   update(doctor: IDoctor): Promise<IDoctor | null>;
   findMany(offset: number, limit: number): Promise<PaginatedResult<IDoctor>>;
}
