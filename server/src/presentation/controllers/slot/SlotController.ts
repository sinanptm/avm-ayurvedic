import { NextFunction, Response } from "express";
import { CustomRequest, StatusCode } from "../../../types";
import SlotUseCase from "../../../use_case/slot/SlotUseCases";
import { Days } from "../../../domain/entities/ISlot";

export default class DoctorController {
    constructor(private slotUseCase: SlotUseCase) { }

    async createManyByDay(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const doctorId = req.doctor?.id;
            const { slots, day } = req.body;

            await this.slotUseCase.createManyByDay(doctorId!, slots, day);
            res.status(StatusCode.Created).json({ message: 'Slots created successfully.' });

        } catch (error) {
            next(error);
        }
    }

    async createForAllDays(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const doctorId = req.doctor?.id!;
            const { startTimes } = req.body;
            await this.slotUseCase.createForAllDays(doctorId, startTimes)
            res.status(StatusCode.Created).json({ message: "Slots created successfully" })
        } catch (error) {
            next(error)
        }
    }

    async deleteManyByDay(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const doctorId = req.doctor?.id;
            const { slots, day } = req.body;
            await this.slotUseCase.deleteManyByDay(doctorId!, slots, day);

            res.status(StatusCode.Success).json({ message: "Slots Deleted successfully" })
        } catch (error) {
            next(error)
        }
    }

    async deleteForAllDays(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const doctorId = req.doctor?.id!;
            const { startTimes } = req.body;

            await this.slotUseCase.deleteForAllDays(doctorId, startTimes)
            res.status(StatusCode.Success).json({ message: "Slots Deleted successfully" })
        } catch (error) {
            next(error)
        }
    }

    async update(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const slot = req.body;
            await this.slotUseCase.update(slot);
            res.status(StatusCode.Success).json({ message: "Slot updated successfully" });
        } catch (error) {
            next(error);
        }
    }

    async getAllDoctorSlots(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const doctorId = req.doctor?.id;
            const day = req.query.day as Days;
            let slots;
            if (Object.values(Days).includes(day)) {
                slots = await this.slotUseCase.getSlotsByDay(doctorId!, day)
            } else {
                slots = await this.slotUseCase.getAllSlots(doctorId!);
            }
            res.status(StatusCode.Success).json(slots);
        } catch (error) {
            next(error);
        }
    }

    async getAllSlotsByDoctorId(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const doctorId = req.params.doctorId
            const date = req.query.date as string;

            const slots = await this.slotUseCase.getSlotsByDate(doctorId, date)
            res.status(StatusCode.Success).json(slots);
        } catch (error) {
            next(error);
        }
    }
}
