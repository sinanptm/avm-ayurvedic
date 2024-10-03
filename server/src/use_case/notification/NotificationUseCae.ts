import INotificationRepository from "../../domain/interface/repositories/INotificationRepository";
import IValidatorService from "../../domain/interface/services/IValidatorService";
import INotification from "../../domain/entities/INotification";

export default class NotificationUseCase {
    constructor(
        private notificationRepository: INotificationRepository,
        private validatorService: IValidatorService
    ) { };

    async clearAll(notificationIds:string[]):Promise<void>{
        this.validatorService.validateMultipleIds(notificationIds)
        await this.notificationRepository.clearAll(notificationIds)
    }
    async clearOn(notificationId:string):Promise<void>{
        this.validatorService.validateIdFormat(notificationId);
        await this.notificationRepository.clear(notificationId)
    }
    
    async getAllPatient(patientId: string): Promise<INotification[] | null> {
        this.validatorService.validateIdFormat(patientId)
        return await this.notificationRepository.findByPatientId(patientId);
    }
    async getAllDoctor(doctorId: string): Promise<INotification[] | null> {
        this.validatorService.validateIdFormat(doctorId);
        return await this.notificationRepository.findByDoctorId(doctorId)
    }
}