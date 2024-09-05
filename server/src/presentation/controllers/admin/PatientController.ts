import { NextFunction, Request,Response } from "express";
import AdminPatientUseCase from "../../../use_case/admin/PatientUseCase";
import { StatusCode } from "../../../types";

export default class AdminPatientController {
    constructor(private adminPatientUseCase: AdminPatientUseCase) {}

    async getPatients(req: Request, res: Response, next: NextFunction) {
        try {
            const offset = parseInt(req.query.offset as string) || 0;
            const limit = parseInt(req.query.limit as string) || 10;

            const patients = await this.adminPatientUseCase.getPatients(offset, limit);
            res.status(StatusCode.Success).json(patients);
        } catch (error) {
            next(error);
        }
    }
}
