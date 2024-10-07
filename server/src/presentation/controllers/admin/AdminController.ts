import { NextFunction, Response, Request } from "express";
import DashboardUseCase from "../../../use_case/admin/DashboardUseCase";
import { StatusCode } from "../../../types";

export default class AdminController {
    constructor(
        private dashboardUseCase: DashboardUseCase
    ) { }

    async getGenderStatics(req: Request, res: Response, next: NextFunction) {
        try {
            const statistics = await this.dashboardUseCase.getPatientGenderStatics();
            res.status(StatusCode.Success).json({ statistics });
        } catch (error) {
            next(error)
        }
    }
    async getUsersStatics(req: Request, res: Response, next: NextFunction) {
        try {
            const statistics = await this.dashboardUseCase.getUsersStatics();
            res.status(StatusCode.Success).json({ statistics });
        } catch (error) {
            next(error)
        }
    }

    async getAppointmentsStatisticsByStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const statistics = await this.dashboardUseCase.getAppointmentsStatisticsByStatus()
            res.status(StatusCode.Success).json({ statistics })
        } catch (error) {
            next(error);
        }
    }

    async getAppointmentsByMonth(req: Request, res: Response, next: NextFunction) {
        try {
            const statistics = await this.dashboardUseCase.getAppointmentsPerMonthStatics();
            res.status(StatusCode.Success).json({ statistics })
        } catch (error) {
            next(error)
        }
    }
}