import {
   Months,
   PatientGenderStatistics,
   UserStatistics,
   AppointmentsByStatusStatistics,
   SlotStatistics,
   AppointmentsPerMonthStatistics,
} from "../../types/statistics";
import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import IPatientRepository from "../../domain/interface/repositories/IPatientRepository";
import IDoctorRepository from "../../domain/interface/repositories/IDoctorRepository";
import ISlotRepository from "../../domain/interface/repositories/ISlotRepository";
import { AppointmentStatus } from "../../domain/entities/IAppointment";
import { endOfMonth, startOfMonth } from "../../utils/date-formatter";

export default class DashboardUseCase {
   constructor(
      private patientRepository: IPatientRepository,
      private appointmentRepository: IAppointmentRepository,
      private doctorRepository: IDoctorRepository,
      private slotRepository: ISlotRepository
   ) {}

   async getPatientGenderStatistics(): Promise<PatientGenderStatistics> {
      return await this.patientRepository.findPatientGenders();
   }

   async getUsersStatistics(): Promise<UserStatistics[]> {
      const currentYear = new Date().getFullYear();
      const startYear = currentYear - 2;
      const endYear = currentYear + 5;
      const statisticsMap: Map<string, UserStatistics> = new Map();

      for (let year = startYear; year <= endYear; year++) {
         for (const month of Object.values(Months)) {
            const startTime = startOfMonth(new Date(year, Object.keys(Months).indexOf(month), 1));
            const endTime = endOfMonth(startTime);

            const patients = await this.patientRepository.getCountInTimeRange(startTime, endTime);
            const doctors = await this.doctorRepository.getCountInTimeRange(startTime, endTime);

            if (!statisticsMap.has(month)) {
               statisticsMap.set(month, { month, doctors: 0, patients: 0 });
            }

            const currentStats = statisticsMap.get(month)!;
            currentStats.doctors += doctors;
            currentStats.patients += patients;
         }
      }

      return Array.from(statisticsMap.values());
   }

   async getAppointmentsPerMonthStatistics(): Promise<AppointmentsPerMonthStatistics[]> {
      const currentYear = new Date().getFullYear();
      const startYear = currentYear - 2;
      const endYear = currentYear + 5;
      const statisticsMap: Map<string, AppointmentsPerMonthStatistics> = new Map();

      for (let year = startYear; year <= endYear; year++) {
         for (const month of Object.values(Months)) {
            const startTime = startOfMonth(new Date(year, Object.keys(Months).indexOf(month), 1));
            const endTime = endOfMonth(startTime);

            const count = await this.appointmentRepository.getCountByRange(startTime, endTime);

            if (!statisticsMap.has(month)) {
               statisticsMap.set(month, { month, count: 0 });
            }

            const currentStats = statisticsMap.get(month)!;
            currentStats.count += count;
         }
      }

      return Array.from(statisticsMap.values());
   }

   async getSlotsStatistics(): Promise<SlotStatistics[]> {
      return await this.slotRepository.getSlotUsageCount();
   }

   async getAppointmentsStatisticsByStatus(): Promise<AppointmentsByStatusStatistics[]> {
      const statistics: AppointmentsByStatusStatistics[] = [];
      for (let status of Object.values(AppointmentStatus)) {
         const count = await this.appointmentRepository.getCountsByStatus(status);
         statistics.push({
            status,
            count,
         });
      }
      return statistics;
   }
}
