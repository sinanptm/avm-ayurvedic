import IPatientRepository from "../../domain/interface/repositories/IPatientRepository";
import ICloudStorageService from "../../domain/interface/services/ICloudStorageService";
import { IPatient } from "../../domain/entities/IPatient";
import IValidatorService from "../../domain/interface/services/IValidatorService";
import ValidationError from "../../domain/entities/ValidationError";
import { StatusCode } from "../../types";

export default class PatientUseCase {
   constructor(
      private patientRepository: IPatientRepository,
      private cloudStorageService: ICloudStorageService,
      private validatorService: IValidatorService
   ) {}

   async getUserProfile(id: string): Promise<IPatient> {
      this.validatorService.validateIdFormat(id);
      const patient = await this.patientRepository.findById(id);
      if (!patient) throw new ValidationError("Patient not found", StatusCode.NotFound);
      if (patient.isBlocked) throw new ValidationError("Patient account is blocked", StatusCode.Forbidden);
      return patient;
   }

   async updateProfile(id: string, patient: IPatient): Promise<void> {
      this.validatorService.validateIdFormat(id);
      this.validatorService.validateRequiredFields(patient);
      this.validatorService.validateLength(patient.name!, 2, 30);
      this.validatorService.validatePhoneNumber(patient.phone!);

      const existingPatient = await this.patientRepository.findById(id);
      if (!existingPatient) throw new ValidationError("Patient not found", StatusCode.NotFound);
      if (existingPatient.isBlocked) throw new ValidationError("Patient account is blocked", StatusCode.Forbidden);

      await this.patientRepository.findByIdAndUpdate(id, patient);
   }

   async createPreSignedUrl(id: string): Promise<{ url: string; key: string }> {
      this.validatorService.validateIdFormat(id);
      const patient = await this.patientRepository.findById(id);
      if (!patient) throw new ValidationError("Patient not found", StatusCode.NotFound);

      const key = `profile-images/${id}-${Date.now()}`;
      const url = await this.cloudStorageService.generatePreSignedUrl(process.env.S3_BUCKET_NAME!, key, 30);
      return { url, key };
   }

   async updateProfileImage(id: string, key: string): Promise<void> {
      this.validatorService.validateRequiredFields({ key, id });
      this.validatorService.validateIdFormat(id);

      const patient = await this.patientRepository.findById(id);
      if (!patient) throw new ValidationError("Patient not found", StatusCode.NotFound);
      if (patient.isBlocked) throw new ValidationError("Patient account is blocked", StatusCode.Forbidden);

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
