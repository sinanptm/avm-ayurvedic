import ISlot from "../../domain/entities/ISlot";
import IDoctorRepository from "../../domain/interface/repositories/IDoctorRepository";
import ISlotRepository from "../../domain/interface/repositories/ISlotRepository";
import { Days } from "../../domain/entities/ISlot";

export default class SlotUseCase {
    protected interval: number;

    constructor(
        private doctorRepository: IDoctorRepository,
        private slotRepository: ISlotRepository
    ) {
        this.interval = 1;
    }

    async create(slot: ISlot): Promise<void> {
        const doctor = await this.doctorRepository.findByID(slot.doctorId!);
        if (!doctor) {
            throw new Error("Doctor Not Found");
        }
        slot.endTime = this.calculateEndTime(slot.startTime!);
        await this.slotRepository.create(slot);
    }

    async update(slot: ISlot): Promise<void> {
        await this.slotRepository.update(slot);
    }

    async getAllSlots(doctorId: string): Promise<ISlot[] | null> {
        return await this.slotRepository.findMany(doctorId);
    }

    async getSlotsOfDay(doctorId:string,date:string):Promise<ISlot[] | null>{
        const day = this.getDayFromDate(date);
        return await this.slotRepository.findManyByDay(doctorId,day);
    }

    private getDayFromDate(date: string): Days {
        const dayOfWeek = new Date(date).getDay();
        const dayNames = Object.values(Days);
        return dayNames[dayOfWeek] as Days;
    }


    private calculateEndTime(startTime: string): string {
        const [hours, minutes] = startTime.split(":").map(Number);
        const endHour = (hours + this.interval) % 24;
        return `${endHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

}

