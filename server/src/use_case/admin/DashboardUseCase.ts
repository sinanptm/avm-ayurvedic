import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import IPatientRepository from "../../domain/interface/repositories/IPatientRepository";
import IDoctorRepository from "../../domain/interface/repositories/IDoctorRepository";
import { Months, PatientGenderStatics, UserStatistics, AppointmentsPerMonthStatics, AppointmentsByStatusStatistics } from "../../types/statics";
import IValidatorService from "../../domain/interface/services/IValidatorService";
import { endOfMonth, startOfMonth } from "../../utils/date-formatter";
import { AppointmentStatus } from "../../domain/entities/IAppointment";

export default class DashboardUseCase {
    constructor(
        private validatorService: IValidatorService,
        private patientRepository: IPatientRepository,
        private appointmentRepository: IAppointmentRepository,
        private doctorRepository: IDoctorRepository
    ) { }

    async getPatientGenderStatics(): Promise<PatientGenderStatics> {
        return await this.patientRepository.findPatientGenders();
    }
    async getUsersStatics(): Promise<UserStatistics[]> {
        const year = new Date().getFullYear();
        const statistics: UserStatistics[] = [];

        for (const month of Object.values(Months)) {
            const startTime = startOfMonth(new Date(year, Object.keys(Months).indexOf(month), 1));
            const endTime = endOfMonth(startTime);

            const patients = await this.patientRepository.getCountInTimeRange(startTime, endTime);
            const doctors = await this.doctorRepository.getCountInTimeRange(startTime, endTime);

            statistics.push({
                month,
                doctors,
                patients,
            });
        }
        return statistics;
    }

    async getAppointmentsPerMonthStatics(): Promise<AppointmentsPerMonthStatics[]> {
        const year = new Date().getFullYear();
        const statistics: AppointmentsPerMonthStatics[] = [];

        for (const month of Object.values(Months)) {
            const startTime = startOfMonth(new Date(year, Object.keys(Months).indexOf(month), 1));
            const endTime = endOfMonth(startTime);

            const count = await this.appointmentRepository.getCountByRange(startTime, endTime);

            statistics.push({
                month,
                count
            })
        };

        return statistics;
    }

    async getAppointmentsStatisticsByStatus(): Promise<AppointmentsByStatusStatistics[]> {
        const statistics: AppointmentsByStatusStatistics[] = [];
        for (let status of Object.values(AppointmentStatus)) {
            const count = await this.appointmentRepository.getCountsByStatus(status)
            statistics.push({
                status,
                count
            })
        }
        return statistics;
    }
}