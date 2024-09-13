import { StatusCode } from "../../types";
import UnauthenticatedUseCases from "../../use_case/UnauthenticatedUseCases";
import { NextFunction, Request, Response } from "express";

export default class UnauthenticatedControllers {
    constructor(private unauthenticatedUseCase: UnauthenticatedUseCases) { }

    async getDoctors(req: Request, res: Response, next: NextFunction) {
        try {
            // let offset = parseInt(req.query.offset as string);
            // let limit = parseInt(req.query.limit as string);

            // offset = isNaN(offset) || offset < 0 ? 0 : offset;
            // limit = isNaN(limit) || limit < 0 ? 10 : Math.min(limit, 100);
            res.status(StatusCode.Success).json(await this.unauthenticatedUseCase.getDoctors(0, 100))
        } catch (error) {
            next(error)
        }
    }
}