import IDoctor from "../../entities/IDoctor";
import { Types } from "mongoose";
import { PaginatedResult } from "../../../types";

export default interface IDoctorRepository {
   findByEmail(email: string): Promise<IDoctor | null>;
   findById(id: string | Types.ObjectId): Promise<IDoctor | null>;
   findByEmailWithCredentials(email: string): Promise<IDoctor | null>;
   create(doctor: IDoctor): Promise<string>;
   update(doctor: IDoctor): Promise<IDoctor | null>;
   findMany(offset: number, limit: number, isVerified: boolean, isBlocked: boolean): Promise<PaginatedResult<IDoctor>>;
}
