import { AppointmentStatus } from "../domain/entities/IAppointment";

export enum Months {
    January = "January",
    February = "February",
    March = "March",
    April = "April",
    May = "May",
    June = "June",
    July = "July",
    August = "August",
    September = "September",
    October = "October",
    November = "November",
    December = "December",
}

export type PatientGenderStatics = {
    male: number;
    female: number;
    others: number;
}

export type UserStatistics = {
    month: Months;
    doctors: number;
    patients: number;
};

export type AppointmentsPerMonthStatics = {
    month:Months;
    count:number;
}

export type AppointmentsByStatusStatistics = {
    status:AppointmentStatus;
    count:number
}