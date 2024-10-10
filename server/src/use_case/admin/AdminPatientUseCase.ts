import IPatientRepository from "../../domain/interface/repositories/IPatientRepository";
import IValidatorService from "../../domain/interface/services/IValidatorService";
import IPatient from "../../domain/entities/IPatient";
import { PaginatedResult, StatusCode } from "../../types";
import CustomError from "../../domain/entities/CustomError";

export default class AdminPatientUseCase {
   constructor(
      private patientRepository: IPatientRepository,
      private validatorService: IValidatorService
   ) { }

   async getAll(offset: number, limit: number): Promise<PaginatedResult<IPatient>> {
      return await this.patientRepository.findMany(offset, limit);
   }

   async blockUnblock(id: string, isBlocked: boolean, adminEmail: string) {
      console.log(adminEmail);
      if (adminEmail === 'admin@gmail.com') {
         throw new CustomError("😊This action is Not Allowed to Demo Admin ❌", StatusCode.BadRequest);
      }
      this.validatorService.validateIdFormat(id);
      this.validatorService.validateBoolean(isBlocked);
      return await this.patientRepository.update(id, { isBlocked: !isBlocked });
   }
}
