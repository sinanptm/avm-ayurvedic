import { NextFunction, Response } from "express";
import { CustomRequest, StatusCode } from "../../../types";
import GetPatientUseCaseDoctor from "../../../use_case/doctor/GetPatientUseCase";

export default class DoctorController {
    constructor(
        private getPatientUseCase: GetPatientUseCaseDoctor,
    ){};

    async getPatients(req:CustomRequest,res:Response,next:NextFunction){
        try {
            const doctorId = req.doctor?.id!;
            const patients = this.getPatientUseCase.exec(doctorId);
            res.status(StatusCode.Success).json(patients);
        } catch (error) {
            next(error)
        }
    }
}