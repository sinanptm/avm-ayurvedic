import { NextFunction, Response, Request } from "express";
import DashboardUseCase from "../../../use_case/admin/DashboardUseCase";
import { StatusCode } from "../../../types";

export default class AdminController {
   constructor(private dashboardUseCase: DashboardUseCase) {}

   async getGenderStatistics(req: Request, res: Response, next: NextFunction) {
      try {
         const statistics = await this.dashboardUseCase.getPatientGenderStatistics();
         res.status(StatusCode.Success).json({ statistics });
      } catch (error) {
         next(error);
      }
   }
   async getUsersStatistics(req: Request, res: Response, next: NextFunction) {
      try {
         const statistics = await this.dashboardUseCase.getUsersStatistics();
         res.status(StatusCode.Success).json({ statistics });
      } catch (error) {
         next(error);
      }
   }

   async getAppointmentsStatisticsByStatus(req: Request, res: Response, next: NextFunction) {
      try {
         const statistics = await this.dashboardUseCase.getAppointmentsStatisticsByStatus();
         res.status(StatusCode.Success).json({ statistics });
      } catch (error) {
         next(error);
      }
   }

   async getAppointmentsPerMonthStatistics(req: Request, res: Response, next: NextFunction) {
      try {
         const statistics = await this.dashboardUseCase.getAppointmentsPerMonthStatistics();
         res.status(StatusCode.Success).json({ statistics });
      } catch (error) {
         next(error);
      }
   }

   async getSlotUsageStatistics(req: Request, res: Response, next: NextFunction) {
      try {
         const statistics = await this.dashboardUseCase.getSlotsStatistics();
         res.status(StatusCode.Success).json({ statistics });
      } catch (error) {
         next(error);
      }
   }
}
