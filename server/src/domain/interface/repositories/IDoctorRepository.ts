import IDoctor from "../../entities/IDoctor";
import { PaginatedResult } from "../../../types";
import IRepository from "./IRepository";

export default interface IDoctorRepository extends IRepository<IDoctor> {
   findByEmail(email: string): Promise<IDoctor | null>;
   findByEmailWithCredentials(email: string): Promise<IDoctor | null>;
   findMany(offset: number, limit: number, isVerified: boolean, isBlocked: boolean): Promise<PaginatedResult<IDoctor>>;
}
