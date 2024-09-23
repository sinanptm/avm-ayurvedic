import IPatientRepository from "../../domain/interface/repositories/IPatientRepository";
import IPatient  from "../../domain/entities/IPatient";
import IValidatorService from "../../domain/interface/services/IValidatorService";
import { PaginatedResult } from "../../types";

export default class AdminPatientUseCase {
   constructor(
      private patientRepository: IPatientRepository,
      private validatorService: IValidatorService
   ) {}

   async getAll(offset: number, limit: number): Promise<PaginatedResult<IPatient>> {
      return await this.patientRepository.findMany(offset, limit);
   }

   async blockUnblock(id: string, isBlocked: boolean) {
      return await this.patientRepository.update({ _id: id, isBlocked: !isBlocked });
   }
}
