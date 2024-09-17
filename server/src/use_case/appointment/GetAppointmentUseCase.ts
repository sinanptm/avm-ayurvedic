import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import IAppointment, { AppointmentStatus } from "../../domain/entities/IAppointment";
import IValidatorService from "../../domain/interface/services/IValidatorService";

export default class GetAppointmentUseCase {
    constructor(
        private appointmentRepository: IAppointmentRepository,
        private validatorService: IValidatorService
    ) { }

    async getAppointmentsByDoctorId(doctorId: string, status?: AppointmentStatus): Promise<IAppointment[] | null> {
        this.validatorService.validateIdFormat(doctorId);
        if(status){
            this.validatorService.validateEnum(status,Object.values(AppointmentStatus))
        }
        return await this.appointmentRepository.findManyByDoctorId(doctorId, status ?? AppointmentStatus.CONFIRMED)
    }

}