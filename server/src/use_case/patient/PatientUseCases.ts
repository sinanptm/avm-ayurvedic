import { IPatient } from "../../domain/entities/Patient";
import IPatientRepository from "../../interface/repositories/IPatientRepository";
import IImageService from "../../interface/services/IImageService";

export default class PatientUseCase {
   constructor(
      private patientRepository: IPatientRepository,
      private imageService: IImageService
   ) {}

   async getUserProfile(id: string): Promise<IPatient> {
      const patient = await this.patientRepository.findById(id);
      if (!patient) throw new Error("Patient Not Found");
      if (patient.isBlocked) throw new Error("Patient Is Blocked");
      return patient;
   }

   async updateProfile(id: string, patient: IPatient): Promise<void> {
      const existingInfo = await this.patientRepository.findById(id);
      if (!existingInfo) throw new Error("Patient Not Found");
      await this.patientRepository.findByIdAndUpdate(id, patient);
   }

   async updateProfileImage(id: string, image: Buffer, contentType: string): Promise<void> {
      const patient = await this.patientRepository.findById(id);
      if (!patient) throw new Error("Patient Not Found");
   
      const key = `profile-images/${id}-${Date.now()}`;
      const { url } = await this.imageService.uploadFile(process.env.S3_BUCKET_NAME!, key, image, contentType);
   
      patient.profile = url;
      await this.patientRepository.update(patient);
   }
   
}
