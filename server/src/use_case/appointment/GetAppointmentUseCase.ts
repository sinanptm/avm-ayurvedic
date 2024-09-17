import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import IAppointment, { AppointmentStatus, IExtendedAppointment } from "../../domain/entities/IAppointment";
import IValidatorService from "../../domain/interface/services/IValidatorService";
import { PaginatedResult } from "../../types";

export default class GetAppointmentUseCase {
    constructor(
        private appointmentRepository: IAppointmentRepository,
        private validatorService: IValidatorService
    ) { }

    async getAppointmentsByDoctorId(doctorId: string,offset:number,limit:number, status?: AppointmentStatus): Promise<PaginatedResult<IAppointment> | null> {
        this.validatorService.validateIdFormat(doctorId);
        if(status){
            this.validatorService.validateEnum(status,Object.values(AppointmentStatus))
        }
        return await this.appointmentRepository.findManyByDoctorId(doctorId, status ?? AppointmentStatus.CONFIRMED, offset,limit)
    }

    async getAppointmentDetails(appointmentId:string):Promise<IExtendedAppointment|null>{
        this.validatorService.validateIdFormat(appointmentId)
        return await this.appointmentRepository.findDetailsById(appointmentId);
    }

}