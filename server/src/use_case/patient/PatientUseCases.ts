import { IPatient } from "../../domain/entities/IPatient";
import IPatientRepository from "../../domain/interface/repositories/IPatientRepository";
import ICloudStorageService from "../../domain/interface/services/ICloudStorageService";

export default class PatientUseCase {
   constructor(
      private patientRepository: IPatientRepository,
      private cloudStorageService: ICloudStorageService
   ) {}

   async getUserProfile(id: string): Promise<IPatient> {
      const patient = await this.patientRepository.findById(id);
      if (!patient) throw new Error("Not Found");
      if (patient.isBlocked) throw new Error("Patient is Blocked");
      return patient;
   }

   async updateProfile(id: string, patient: IPatient): Promise<void> {
      const existingInfo = await this.patientRepository.findById(id);
      if (!existingInfo) throw new Error("Not Found");
      if (existingInfo.isBlocked) throw new Error("Patient is Blocked");
      await this.patientRepository.findByIdAndUpdate(id, patient);
   }

   async createPreSignedUrl(id: string): Promise<{ url: string; key: string }> {
      const key = `profile-images/${id}-${Date.now()}`;
      const url = await this.cloudStorageService.generatePreSignedUrl(process.env.S3_BUCKET_NAME!, key, 30);
      return { url, key };
   }

   async updateProfileImage(id: string, key: string): Promise<void> {
      const patient = await this.patientRepository.findById(id);
      if (!patient) throw new Error("Not Found");
      if (patient.isBlocked) throw new Error("Patient is Blocked");

      if (patient.profile) {
         await this.cloudStorageService.deleteFile(
            process.env.S3_BUCKET_NAME!,
            patient.profile.split("amazonaws.com/").pop()!
         );
      }

      const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
      patient.profile = imageUrl;
      await this.patientRepository.update(patient);
   }
}
