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

   async updateProfileImage(id: string, image: string): Promise<void> {
      const patient = await this.patientRepository.findById(id);
      if (!patient) throw new Error("Patient Not Found");
   
      patient.profile = image;
      await this.patientRepository.update(patient);
   }
   
   async createPreSignedUrl(id: string, expiresIn: number): Promise<string> {
      const key = `profile-images/patients/${id}-${Date.now()}`;
      const url = await this.imageService.generatePreSignedUrl(process.env.S3_BUCKET_NAME!, key, expiresIn);
      return url;
   }
}
