import { Response } from "express";
import GetVideoSectionUseCase from "../../../use_case/video/GetVideoSectionUseCase";
import { CustomRequest } from "../../../types";

export default class VideoController {
    constructor(
        private getVideoSectionUseCase: GetVideoSectionUseCase
    ) { };

    async getSectionsInOneDayDoctor(req: CustomRequest, res: Response) {
        const doctorId = req.doctor?.id;
        const videoSection = await this.getVideoSectionUseCase.getSectionInOneDayDoctor(doctorId!);
        return res.json(videoSection);
    }

    async getSectionsInOneDayPatient(req: CustomRequest, res: Response) {
        const patientId = req.patient?.id;
        const videoSection = await this.getVideoSectionUseCase.getSectionsInOneDayPatient(patientId!);
        return res.json(videoSection);
    }

}