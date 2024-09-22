import { NextFunction, Response } from "express";
import { CustomRequest, StatusCode } from "../../../types";
import { Days } from "../../../domain/entities/ISlot";
import CreateSlotUseCase from "../../../use_case/slot/CreateSlotUseCase";
import UpdateSlotUseCase from "../../../use_case/slot/UpdateSlotUseCase";
import GetSlotUseCase from "../../../use_case/slot/GetSlotUseCase";
import DeleteSlotUseCase from "../../../use_case/slot/DeleteSlotUseCase";

export default class DoctorController {
   constructor(
      private createSlotUseCase: CreateSlotUseCase,
      private updateSlotUseCase: UpdateSlotUseCase,
      private getSlotUseCase: GetSlotUseCase,
      private deleteSlotUseCase: DeleteSlotUseCase
   ) {}

   async createManyByDay(req: CustomRequest, res: Response, next: NextFunction) {
      try {
         const doctorId = req.doctor?.id;
         const { slots, day } = req.body;

         await this.createSlotUseCase.createManyByDay(doctorId!, slots, day);
         res.status(StatusCode.Created).json({ message: "Slots created successfully." });
      } catch (error) {
         next(error);
      }
   }

   async createForAllDays(req: CustomRequest, res: Response, next: NextFunction) {
      try {
         const doctorId = req.doctor?.id!;
         const { startTimes } = req.body;
         await this.createSlotUseCase.createForAllDays(doctorId, startTimes);
         res.status(StatusCode.Created).json({ message: "Slots created successfully" });
      } catch (error) {
         next(error);
      }
   }

   async deleteManyByDay(req: CustomRequest, res: Response, next: NextFunction) {
      try {
         const doctorId = req.doctor?.id;
         const { slots, day } = req.body;
         await this.deleteSlotUseCase.deleteManyByDay(doctorId!, slots, day);

         res.status(StatusCode.Success).json({ message: "Slots Deleted successfully" });
      } catch (error) {
         next(error);
      }
   }

   async deleteForAllDays(req: CustomRequest, res: Response, next: NextFunction) {
      try {
         const doctorId = req.doctor?.id!;
         const { startTimes } = req.body;

         await this.deleteSlotUseCase.deleteForAllDays(doctorId, startTimes);
         res.status(StatusCode.Success).json({ message: "Slots Deleted successfully" });
      } catch (error) {
         next(error);
      }
   }

   async update(req: CustomRequest, res: Response, next: NextFunction) {
      try {
         const slot = req.body;
         await this.updateSlotUseCase.update(slot);
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
            slots = await this.getSlotUseCase.getSlotsByDay(doctorId!, day);
         } else {
            slots = await this.getSlotUseCase.getAllSlots(doctorId!);
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

         const slots = await this.getSlotUseCase.getSlotsByDate(doctorId, date);
         res.status(StatusCode.Success).json(slots);
      } catch (error) {
         next(error);
      }
   }
}
