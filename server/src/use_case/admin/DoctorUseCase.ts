import IDoctor from "../../domain/entities/IDoctor";
import IDoctorRepository from "../../domain/interface/repositories/IDoctorRepository";
import { PaginatedResult } from "../../types";

export default class AdminDoctorUseCase {
   constructor(private doctorRepository: IDoctorRepository) {}

   async getAll(offset:number,limit:number):Promise<PaginatedResult<IDoctor>>{
      const data = await this.doctorRepository.findMany(offset,limit);
      data.items= data.items.filter((doctor)=>doctor.role!=='admin')
      return data;
   }

   async update(doctor:IDoctor):Promise<void>{
      await this.doctorRepository.update(doctor);
   }
}
