import { NextFunction, Response } from "express";
import CreateChatUseCase from "../../../use_case/chat/CreateChatUseCase";
import GetChatUseCase from "../../../use_case/chat/GetChatUseCase";
import { CustomRequest, StatusCode } from "../../../types";

export default class ChatController {
    constructor(
        private createChatUseCase: CreateChatUseCase,
        private getChatUseCase: GetChatUseCase
    ) { }
    async createChatPatient(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const patientId = req.patient?.id;
            const { doctorId } = req.body;
            await this.createChatUseCase.createChat(doctorId, patientId!);
            res.status(StatusCode.Success).json({ message: "Chat has created" });
        } catch (error: any) {
            next(error);
        }
    }
    async createChatDoctor(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const doctorId = req.doctor?.id;
            const { patientId } = req.body;
            await this.createChatUseCase.createChat(doctorId!, patientId);
            res.status(StatusCode.Success).json({ message: "Chat has created" });
        } catch (error: any) {
            next(error);
        }
    }
    async createMessageDoctor(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const doctorId = req.doctor?.id;
            const { chatId, patientId, message } = req.body;
            await this.createChatUseCase.createMessage(chatId, patientId, message, doctorId!);
            res.status(StatusCode.Success).json({ message: "Chat has created" });
        } catch (error: any) {
            next(error);
        }
    }
    async createMessagePatient(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const doctorId = req.doctor?.id;
            const { chatId, patientId, message } = req.body;
            await this.createChatUseCase.createMessage(chatId, patientId, message, doctorId!);
            res.status(StatusCode.Success).json({ message: "Chat has created" });
        } catch (error: any) {
            next(error);
        }
    }
}