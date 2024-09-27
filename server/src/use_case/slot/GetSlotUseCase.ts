import ISlotRepository from "../../domain/interface/repositories/ISlotRepository";
import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import IValidatorService from "../../domain/interface/services/IValidatorService";
import ISlot, { Days } from "../../domain/entities/ISlot";
import { addHours } from "../../utils/date-formatter";

export default class GetSlotUseCase {
   constructor(
      private slotRepository: ISlotRepository,
      private appointmentRepository: IAppointmentRepository,
      private validatorService: IValidatorService
   ) {}

   async getAllSlots(doctorId: string): Promise<ISlot[] | null> {
      this.validatorService.validateIdFormat(doctorId);
      return await this.slotRepository.findMany(doctorId);
   }

   async getSlotsByDay(doctorId: string, day: Days): Promise<ISlot[] | null> {
      this.validatorService.validateEnum(day, Object.values(Days));
      this.validatorService.validateIdFormat(doctorId);
      return await this.slotRepository.findManyByDay(doctorId, day);
   }

   async getSlotsByDate(doctorId: string, date: string): Promise<ISlot[] | []> {
      this.validatorService.validateIdFormat(doctorId);
      this.validatorService.validateDateFormat(date);

      const dateAfterOneHour = addHours(new Date(),1);

      const appointments = await this.appointmentRepository.findManyByDateAndDoctorId(date, doctorId);
      const slotIds = appointments?.map((el) => el.slotId!) || [];
      const day = this.getDayFromDate(date);
      const slots = await this.slotRepository.findManyNotInSlotIds(doctorId, day, slotIds);

      // filtering the slots that are before the dateAfterOneHour
      return slots ? slots.filter(slot=>{
         const startTime = this.parseTimeStringToDate(slot.startTime!);
         return startTime > dateAfterOneHour;
      }) : []
   }

   private getDayFromDate(date: string): Days {
      const dayOfWeek = new Date(date).getUTCDay();
      const dayNames = Object.values(Days);
      return dayNames[dayOfWeek] as Days;
   }

   private parseTimeStringToDate (timeString: string): Date {
      const [time, modifier] = timeString.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
    
      if (modifier === 'PM' && hours < 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;
      
      const date = new Date();
      date.setHours(hours, minutes, 0, 0); 
      return date;
    };
}
