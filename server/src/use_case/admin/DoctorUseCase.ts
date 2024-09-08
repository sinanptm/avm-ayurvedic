import IDoctor from "../../domain/entities/IDoctor";
import IDoctorRepository from "../../domain/interface/repositories/IDoctorRepository";
import { PaginatedResult } from "../../types";

export default class AdminDoctorUseCase {
   constructor(private doctorRepository: IDoctorRepository) {}

   async create(email: string): Promise<void> {
      await this.doctorRepository.create({ email });
   }

   async getAll(offset:number,limit:number):Promise<PaginatedResult<IDoctor>>{
      return await this.doctorRepository.findMany(offset,limit);
   }
}
