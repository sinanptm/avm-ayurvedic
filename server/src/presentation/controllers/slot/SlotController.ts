import { NextFunction, Response } from "express";
import { CustomRequest, StatusCode } from "../../../types";
import SlotUseCase from "../../../use_case/slot/SlotUseCases";
import { Days } from "../../../domain/entities/ISlot";

export default class DoctorController {
    private timeFormat: RegExp;
    constructor(private slotUseCase: SlotUseCase) {
        this.timeFormat = /^(0[1-9]|1[0-2]):([0-5][0-9])\s?(AM|PM)$/i;
    }

    // async create(req: CustomRequest, res: Response, next: NextFunction) {
    //     try {
    //         const doctorId = req.doctor?.id;
    //         const slot = req.body;

    //         if (!slot.day || !Object.values(Days).includes(slot.day)) {
    //             return res.status(StatusCode.BadRequest).json({ message: `Invalid or missing day for slot: ${JSON.stringify(slot)}` });
    //         }

    //         if (!slot.startTime || !this.timeFormat.test(slot.startTime)) {
    //             return res.status(StatusCode.BadRequest).json({ message: `Invalid or missing startTime for slot: ${JSON.stringify(slot)}` });
    //         }

    //         await this.slotUseCase.create(slot, doctorId!);
    //         return res.status(StatusCode.Created).json({ message: "Slot created successfully" });

    //     } catch (error) {
    //         next(error);
    //     }
    // }

    async createSlotsForDay(req: CustomRequest, res: Response, next: NextFunction) {
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
            await this.slotUseCase.createSlotsForDay(doctorId!, slots, day);
            res.status(StatusCode.Created).json({ message: 'Slots created successfully.' });

        } catch (error) {
            next(error);
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
            const date = req.query.date as string;
            let slots;
            if (date) {
                slots = await this.slotUseCase.getSlotsByDay(doctorId!, date)
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
            const doctorId = req.params.doctorId;
            const date = req.query.date as string;
            let slots;
            if (date) {
                slots = await this.slotUseCase.getSlotsByDay(doctorId, date)
            } else {
                slots = await this.slotUseCase.getAllSlots(doctorId!);
            }
            res.status(StatusCode.Success).json(slots);
        } catch (error) {
            next(error);
        }
    }
}
