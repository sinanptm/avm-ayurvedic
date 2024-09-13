import ISlot, { SlotStatus } from "../../domain/entities/ISlot";
import ISlotRepository from "../../domain/interface/repositories/ISlotRepository";
import { Days } from "../../domain/entities/ISlot";

export default class SlotUseCase {
    protected interval: number;

    constructor(
        private slotRepository: ISlotRepository
    ) {
        this.interval = 1;
    }

    async createSlotsForDay(doctorId: string, slots: ISlot[], day: Days): Promise<void> {
        const existingSlots = await this.slotRepository.findManyByDay(doctorId, day);
        const newSlots = slots
            .filter(slot => !existingSlots?.find(existing => existing.startTime === slot.startTime))
            .map(slot => ({
                ...slot,
                doctorId,
                status: 'available' as SlotStatus,
                endTime: this.calculateEndTime(slot.startTime!),
                day,
            }));
    
        if (newSlots.length > 0) {
            await this.slotRepository.createMany(newSlots);
        }
    }
    
    // async create(slot: ISlot, doctorId: string): Promise<void> {
    //     slot.endTime = this.calculateEndTime(slot.startTime!);
    //     slot.status = 'available';
    //     slot.doctorId = doctorId;
    
    //     await this.slotRepository.create(slot);
    // }
    
    async update(slot: ISlot): Promise<void> {
        await this.slotRepository.update(slot);
    }

    async getAllSlots(doctorId: string): Promise<ISlot[] | null> {
        return await this.slotRepository.findMany(doctorId);
    }

    async getSlotsByDay(doctorId: string, date: string): Promise<ISlot[] | null> {
        const day = this.getDayFromDate(date);
        return await this.slotRepository.findManyByDay(doctorId, day);
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

