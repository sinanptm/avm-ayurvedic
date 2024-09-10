import IDoctor from "../../domain/entities/IDoctor";
import IDoctorRepository from "../../domain/interface/repositories/IDoctorRepository";
import IEmailService from "../../domain/interface/services/IEmailService";
import { PaginatedResult } from "../../types";

export default class AdminDoctorUseCase {
   constructor(
      private doctorRepository: IDoctorRepository,
      private emailService: IEmailService
   ) {}

   async getAll(offset: number, limit: number): Promise<PaginatedResult<IDoctor>> {
      const data = await this.doctorRepository.findMany(offset, limit);
      data.items = data.items.filter((doctor) => doctor.role !== "admin");
      return data;
   }

   async update(doctor: IDoctor): Promise<void> {
      const updatedDoctor = await this.doctorRepository.update(doctor);
      if (!updatedDoctor) throw new Error("Not Found");
      if (updatedDoctor?.isVerified!&&doctor.isVerified) {
         await this.emailService.notifyVerified(
            updatedDoctor.email!,
            updatedDoctor.name!,
            `${process.env.CLIENT_URL}/doctor`!
         );
      }
   }
}
