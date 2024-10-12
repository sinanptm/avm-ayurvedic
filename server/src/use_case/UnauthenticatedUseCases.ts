import IDoctorRepository from "../domain/interface/repositories/IDoctorRepository";
import IDoctor from "../domain/entities/IDoctor";
import { PaginatedResult } from "../types";

export default class UnauthenticatedUseCases {
   constructor(private doctorRepository: IDoctorRepository) {}

   async getDoctors(): Promise<PaginatedResult<IDoctor>> {
      const isVerified = true;
      const isBlocked = false;
      const data = await this.doctorRepository.findMany(0, 100, isVerified, isBlocked);
      data.items = data.items.filter((item) => item.role !== "admin");
      return data;
   }
}
