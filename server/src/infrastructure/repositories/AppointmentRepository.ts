import IAppointment, { AppointmentStatus } from "../../domain/entities/IAppointment";
import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import AppointmentModel from "../database/AppointmentModel";

export default class AppointmentRepository implements IAppointmentRepository {
    model = AppointmentModel
    async create(appointment: IAppointment): Promise<string> {
        return (await this.model.create(appointment))._id
    }
    async update(appointment: IAppointment): Promise<void> {
        await this.model.findByIdAndUpdate(appointment._id, appointment, { new: true })
    }

    async findOneBySlotId(slotId: string): Promise<IAppointment | null> {
        return await this.model.findOne({ slotId });
    }

    async findManyByDateAndDoctorId(appointmentDate: string, doctorId: string): Promise<IAppointment[] | null> {
        const dateWithoutTime = appointmentDate.split('T')[0]; 
        return await this.model.find({
            doctorId,
            appointmentDate: { $regex: new RegExp(`^${dateWithoutTime}`) }
        });
    }
    async findByDateAndSlot(appointmentDate: string, slotId: string): Promise<IAppointment | null> {
        return await this.model.findOne({ appointmentDate, slotId })
    }

    async updateStatusMany(appointmentIds: string[], status: AppointmentStatus): Promise<void> {
        await this.model.updateMany({ _id: { $in: appointmentIds } }, { status })
    }

    async updateManyBySlotIds(slotIds: string[], fields: Partial<IAppointment>): Promise<void> {
        await this.model.updateMany({ slotId: { $in: slotIds } }, fields);
    }

    async updateAppointmentStatusToConfirmed(appointmentId: string): Promise<void> {
        await this.model.findByIdAndUpdate(appointmentId, { status: AppointmentStatus.PENDING });
    }

}