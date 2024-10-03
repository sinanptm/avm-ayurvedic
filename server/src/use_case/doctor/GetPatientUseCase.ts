import IPatient from "../../domain/entities/IPatient";
import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";

export default class GetPatientUseCaseDoctor {
    constructor(
        private appointmentRepository: IAppointmentRepository
    ){}

    async exec(doctorId:string):Promise<IPatient[]|[]>{
        return await this.appointmentRepository.findPatientsByDoctorId(doctorId);
    }
}