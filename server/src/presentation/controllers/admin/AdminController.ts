import { NextFunction, Response, Request } from "express";
import DashboardUseCase from "../../../use_case/admin/DashboardUseCase";
import { StatusCode } from "../../../types";

export default class AdminController {
    constructor(
        private dashboardUseCase: DashboardUseCase
    ) { }

    async getGenderStatics(req: Request, res: Response, next: NextFunction) {
        try {
            const statics = await this.dashboardUseCase.getPatientGenderStatics()
            res.status(StatusCode.Success).json({ statics });
        } catch (error) {
            next(error)
        }
    }
}