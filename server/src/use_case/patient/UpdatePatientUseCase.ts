import { IPatient } from "../../domain/entities/Patient";
import IPatientRepository from "../../interface/repositories/IPatientRepository";

export default class PatientUseCase {
   constructor(private patientRepository: IPatientRepository) {}

   async updatePatient(patient: IPatient) {
      return await this.patientRepository.update(patient);
   }

   async changePatientStatus(id: string) {
      const patient = await this.patientRepository.findById(id);
      if (!patient) throw new Error(`No Patient with id: ${id}`);
      return this.patientRepository.changeStatus(id, patient.isBlocked!);
   }
}
