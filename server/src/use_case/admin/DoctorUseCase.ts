import IDoctorRepository from "../../domain/interface/repositories/IDoctorRepository";

export default class AdminDoctorUseCase {
   constructor(private doctorRepository: IDoctorRepository) {}

   async create(email: string): Promise<void> {
      this.doctorRepository.create({ email });
   }
}
