import { NextFunction, Response } from "express";
import { CustomRequest, StatusCode } from "../../../types";
import SlotUseCase from "../../../use_case/slot/SlotUseCases";

export default class DoctorController {
    constructor(private slotUseCase: SlotUseCase) {}

    async create(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const slot = req.body; 
            await this.slotUseCase.create(slot);
            res.status(StatusCode.Created).json({ message: "Slot created successfully" });
        } catch (error) {
            next(error);
        }
    }

    async update(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const slot = req.body; 
            await this.slotUseCase.update(slot);
            res.status(StatusCode.Success).json({ message: "Slot updated successfully" });
        } catch (error) {
            next(error); 
        }
    }

    async getAllSlots(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const doctorId = req.params.doctorId; 
            const slots = await this.slotUseCase.getAllSlots(doctorId);
            res.status(200).json(slots);
        } catch (error) {
            next(error); 
        }
    }

    async getSlotsOfDay(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
        try {
            const doctorId = req.params.doctorId; 
            const date = req.query.date as string; 
            const slots = await this.slotUseCase.getSlotsOfDay(doctorId, date);
            res.status(200).json(slots);
        } catch (error) {
            next(error);
        }
    }
}
