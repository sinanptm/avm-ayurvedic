import { IPatient } from "../../domain/entities/Patient";
import IPatientRepository from "../../interface/repositories/IPatientRepository";

export default class PatientUseCase {
   constructor(private patientRepository: IPatientRepository) {}

   async getUserProfile(id:string):Promise<IPatient>{
      const patient =  await this.patientRepository.findById(id);
      if(!patient) throw new Error("Patient Not Found");
      if(patient.isBlocked) throw new Error("Patient Is Blocked");
      return patient;
   };
}
