import { NextFunction, Response } from "express";
import CreateChatUseCase from "../../../use_case/chat/CreateChatUseCase";
import GetChatUseCase from "../../../use_case/chat/GetChatUseCase";
import { CustomRequest, StatusCode } from "../../../types";

export default class ChatController {
    constructor(
        private createChatUseCase: CreateChatUseCase,
        private getChatUseCase: GetChatUseCase
    ) { }
    async getChatsOfPatient(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const patientId = req.patient?.id;
            const chats = await this.getChatUseCase.getAllChatsWithPatientId(patientId!);
            res.status(StatusCode.Success).json(chats)
        } catch (error) {
            next(error)
        }
    }
    async getChatsOfDoctor(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const doctorId = req.doctor?.id;
            const chats = await this.getChatUseCase.getAllChatsWithDoctorId(doctorId!);
            res.status(StatusCode.Success).json(chats)
        } catch (error) {
            next(error)
        }
    }
    async getPatientsDoctor(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const patients = await this.getChatUseCase.getPatientsDoctor();
            res.status(StatusCode.Success).json(patients)
        } catch (error) {
            next(error)
        }
    }
    async getMessagesOfChat(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const chatId = req.params.chatId;
            let limit = +(req.query.limit as string);
            limit = isNaN(limit) || limit < 0 ? 10 : Math.min(limit, 100);
            const { chat, data } = await this.getChatUseCase.getMessagesOfChat(chatId, limit);
            res.status(StatusCode.Success).json({ chat, data });
        } catch (error) {
            next(error)
        }
    }
    // create chat
    async createChatPatient(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const patientId = req.patient?.id;
            const { doctorId } = req.body;
            const chatId = await this.createChatUseCase.createChat(doctorId, patientId!);
            res.status(StatusCode.Created).json({ chatId })
        } catch (error: any) {
            next(error);
        }
    }
    async createChatDoctor(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const doctorId = req.doctor?.id;
            const { patientId } = req.body;
            const chatId = await this.createChatUseCase.createChat(doctorId!, patientId);
            res.status(StatusCode.Created).json({ chatId })
        } catch (error: any) {
            next(error);
        }
    }
    // create message
    async createMessageDoctor(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const doctorId = req.doctor?.id;
            const { chatId, patientId, message } = req.body;
            await this.createChatUseCase.createMessage(chatId, patientId, message, doctorId!);
            res.status(StatusCode.Created)
        } catch (error: any) {
            next(error);
        }
    }
    async createMessagePatient(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const patientId = req.patient?.id;
            const { chatId, doctorId, message } = req.body;
            await this.createChatUseCase.createMessage(chatId, patientId!, message, doctorId);
            res.status(StatusCode.Created)
        } catch (error: any) {
            next(error);
        }
    }
}