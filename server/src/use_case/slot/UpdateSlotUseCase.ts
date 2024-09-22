import ISlot from "../../domain/entities/ISlot";
import ISlotRepository from "../../domain/interface/repositories/ISlotRepository";
import IValidatorService from "../../domain/interface/services/IValidatorService";

export default class UpdateSlotUseCase {
   constructor(
      private slotRepository: ISlotRepository,
      private validatorService: IValidatorService
   ) {}

   async update(slot: ISlot): Promise<void> {
      this.validatorService.validateIdFormat(slot._id!);
      this.validatorService.validateTimeFormat(slot.startTime!);
      await this.slotRepository.update(slot);
   }
}
