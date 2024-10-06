import { StatusCode } from "../../types";
import UnauthenticatedUseCases from "../../use_case/UnauthenticatedUseCases";
import { NextFunction, Request, Response } from "express";

export default class UnauthenticatedControllers {
   constructor(
      private unauthenticatedUseCase: UnauthenticatedUseCases) {}

   async getDoctors(req: Request, res: Response, next: NextFunction) {
      try {
         res.status(StatusCode.Success).json(await this.unauthenticatedUseCase.getDoctors(0, 100));
      } catch (error) {
         next(error);
      }
   }
}
