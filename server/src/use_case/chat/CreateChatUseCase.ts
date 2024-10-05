import IMessageRepository from "../../domain/interface/repositories/IMessageRepository";
import IPatientRepository from "../../domain/interface/repositories/IPatientRepository";
import IDoctorRepository from "../../domain/interface/repositories/IDoctorRepository";
import IChatRepository from "../../domain/interface/repositories/IChatRepository";
import IValidatorService from "../../domain/interface/services/IValidatorService";
import CustomError from "../../domain/entities/CustomError";
import IMessage from "../../domain/entities/IMessage";
import { StatusCode } from "../../types";

export default class CreateChatUseCase {
    constructor(
        private messageRepository: IMessageRepository,
        private chatRepository: IChatRepository,
        private validatorService: IValidatorService,
        private patientRepository: IPatientRepository,
        private doctorRepository: IDoctorRepository
    ) { }
    async createChat(doctorId: string, patientId: string): Promise<string> {
        this.validatorService.validateRequiredFields({ doctorId, patientId });
        this.validatorService.validateIdFormat(doctorId);
        this.validatorService.validateIdFormat(patientId);
        const patient = await this.patientRepository.findById(patientId);
        const doctor = await this.doctorRepository.findById(doctorId);
        if (!patient) {
            throw new CustomError("Invalid patient id", StatusCode.NotFound);
        } else if (!doctor) {
            throw new CustomError("Invalid doctor id", StatusCode.NotFound);
        }
        if (!patient.profile || !patient.name) {
            throw new CustomError("Patient profile or name is missing", StatusCode.BadRequest);
        }
        try {
            const chat = await this.chatRepository.create(
                { doctorId, patientId, patientName: patient.name, doctorName: doctor.name, patientProfile: patient.profile, doctorProfile: doctor.image }
            );
            return chat._id!
        } catch (error: any) {
            if (error.code === 11000) {
                const chat = await this.chatRepository.findByDoctorAndPatientId(doctorId, patientId);
                return chat?._id!
            }
            throw error;
        }
    }
    async createMessage(chatId: string, receiverId: string, message: string, senderId: string): Promise<IMessage> {
        this.validatorService.validateRequiredFields({ chatId, receiverId, message, senderId });
        this.validatorService.validateMultipleIds([chatId, receiverId, senderId]);
        // updating for sorting based on latest message
        await this.chatRepository.update(chatId, { updatedAt: new Date() });
        return await this.messageRepository.create({ chatId, message, receiverId, senderId, isReceived: false });
    }
}