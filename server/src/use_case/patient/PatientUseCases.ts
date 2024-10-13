import IVideoSectionRepository from "../../domain/interface/repositories/IVideoSectionRepository";
import IPatientRepository from "../../domain/interface/repositories/IPatientRepository";
import ICloudStorageService from "../../domain/interface/services/ICloudStorageService";
import IChatRepository from "../../domain/interface/repositories/IChatRepository";
import IValidatorService from "../../domain/interface/services/IValidatorService";
import { AWS_REGION, S3_BUCKET_NAME } from "../../config/env";
import CustomError from "../../domain/entities/CustomError";
import IPatient from "../../domain/entities/IPatient";
import { StatusCode } from "../../types";

export default class PatientUseCase {
   constructor(
      private patientRepository: IPatientRepository,
      private cloudStorageService: ICloudStorageService,
      private validatorService: IValidatorService,
      private chatRepository: IChatRepository,
      private videoSectionRepository: IVideoSectionRepository
   ) {}

   async getUserProfile(id: string): Promise<IPatient> {
      this.validatorService.validateIdFormat(id);
      const patient = await this.patientRepository.findById(id);
      if (!patient) throw new CustomError("Patient not found", StatusCode.NotFound);
      if (patient.isBlocked) throw new CustomError("Patient account is blocked", StatusCode.Forbidden);
      return patient;
   }

   async updateProfile(id: string, patient: IPatient): Promise<void> {
      this.validatorService.validateIdFormat(id);
      this.validatorService.validateRequiredFields(patient);
      this.validatorService.validateLength(patient.name!, 2, 30);
      this.validatorService.validatePhoneNumber(patient.phone!);

      const existingPatient = await this.patientRepository.findById(id);
      if (!existingPatient) throw new CustomError("Patient not found", StatusCode.NotFound);
      if (existingPatient.isBlocked) throw new CustomError("Patient account is blocked", StatusCode.Forbidden);
      if (existingPatient.name !== patient.name) {
         await this.videoSectionRepository.findByPatientIdAndUpdate(id, { patientName: patient.name });
         await this.chatRepository.findByPatientIdAndUpdate(id, { patientName: patient.name });
      }
      await this.patientRepository.update(id, patient);
   }

   async createPreSignedUrl(id: string): Promise<{ url: string; key: string }> {
      this.validatorService.validateIdFormat(id);
      const patient = await this.patientRepository.findById(id);
      if (!patient) throw new CustomError("Patient not found", StatusCode.NotFound);

      const key = `profile-images/patient/${id}-${Date.now()}`;
      const url = await this.cloudStorageService.generatePreSignedUrl(S3_BUCKET_NAME!, key, 30);
      return { url, key };
   }

   async updateProfileImage(id: string, key: string): Promise<void> {
      this.validatorService.validateRequiredFields({ key, id });
      this.validatorService.validateIdFormat(id);

      const patient = await this.patientRepository.findById(id);
      if (!patient) throw new CustomError("Patient not found", StatusCode.NotFound);
      if (patient.isBlocked) throw new CustomError("Patient account is blocked", StatusCode.Forbidden);

      if (patient.profile) {
         await this.cloudStorageService.deleteFile(S3_BUCKET_NAME!, patient.profile.split("amazonaws.com/").pop()!);
      }

      const imageUrl = `https://${S3_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`;
      patient.profile = imageUrl;
      await this.videoSectionRepository.findByPatientIdAndUpdate(id, { patientProfile: imageUrl });
      await this.chatRepository.findByPatientIdAndUpdate(id, { patientProfile: imageUrl });
      await this.patientRepository.update(id, patient);
   }
}
