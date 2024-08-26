import IPatientRepository from "../../interface/repositories/IPatientRepository";

export default class FindPatientUseCase {
   constructor(private patientRepository: IPatientRepository) {}

   async findByPatientEmail(email: string) {
      return await this.patientRepository.findByEmail(email);
   }

   async findByPatientId(id: string) {
      return await this.patientRepository.findById(id);
   }
}
