import { NextFunction, Response } from "express";
import { CustomRequest, StatusCode } from "../../../types";
import CreatePrescriptionUseCase from "../../../use_case/prescription/CreatePrescriptionUseCase";

export default class PrescriptionController {
    constructor(
        private createPrescriptionUseCase: CreatePrescriptionUseCase,
    ){}
    async createPrescription(req: CustomRequest, res: Response, next: NextFunction){
        try {
            const prescription = req.body;
            const doctorId = req.doctor?.id!
            await this.createPrescriptionUseCase.create(doctorId,prescription);
            res.status(StatusCode.Created);
        } catch (error) {
            next(error)
        }
    } 

    async updatePrescription(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const prescription = req.body;
            await this.createPrescriptionUseCase.update(prescription);
            res.status(StatusCode.Success).json({message:"Prescription Updated"});
        } catch (error) {
            next(error)
        }
    }
}