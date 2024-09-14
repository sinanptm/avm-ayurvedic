import { NextFunction, Response } from "express";
import { CustomRequest, StatusCode } from "../../../types";
import SlotUseCase from "../../../use_case/slot/SlotUseCases";
import { Days } from "../../../domain/entities/ISlot";

export default class DoctorController {
    private timeFormat: RegExp;
    constructor(private slotUseCase: SlotUseCase) {
        this.timeFormat = /^(0[1-9]|1[0-2]):([0-5][0-9])\s?(AM|PM)$/i;
    }

    async createManyByDay(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const doctorId = req.doctor?.id;
            const { slots, day } = req.body;

            if (!slots || !Array.isArray(slots) || slots.length === 0) {
                return res.status(StatusCode.BadRequest).json({ message: 'Slots data is required and should be a non-empty array.' });
            }

            if (!Object.values(Days).includes(day)) {
                return res.status(StatusCode.BadRequest).json({ message: 'Invalid or missing day.' });
            }

            for (let slot of slots) {
                if (!slot.startTime || !this.timeFormat.test(slot.startTime)) {
                    return res.status(StatusCode.BadRequest).json({ message: `Invalid or missing startTime for slot: ${JSON.stringify(slot)}` });
                }
            }
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
            for (let time of startTimes) {
                if (!this.timeFormat.test(time)) {
                    return res.status(StatusCode.BadRequest).json({ message: `Invalid or missing startTime  ${time}` });
                }
            }
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

            if (!slots || !Array.isArray(slots) || slots.length === 0) {
                return res.status(StatusCode.BadRequest).json({ message: 'Slots data is required and should be a non-empty array.' });
            }

            if (!Object.values(Days).includes(day)) {
                return res.status(StatusCode.BadRequest).json({ message: 'Invalid or missing day.' });
            }
            for (let slot of slots) {
                if (!slot.startTime || !this.timeFormat.test(slot.startTime)) {
                    return res.status(StatusCode.BadRequest).json({ message: `Invalid or missing startTime for slot: ${JSON.stringify(slot)}` });
                }
            }

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
            for (let time of startTimes) {
                if (!this.timeFormat.test(time)) {
                    return res.status(StatusCode.BadRequest).json({ message: `Invalid or missing startTime  ${time}` });
                }
            }
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
            const doctorId = req.params.doctorI
            const date = req.query.date as string;

            const slots = await this.slotUseCase.getSlotsByDate(doctorId, date)
            res.status(StatusCode.Success).json(slots);
        } catch (error) {
            next(error);
        }
    }
}
