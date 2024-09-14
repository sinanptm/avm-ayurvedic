import IAppointment, { AppointmentStatus } from "../../domain/entities/IAppointment";
import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import AppointmentModel from "../database/AppointmentModel";
import { isValidObjectId } from "../database/isValidObjId";

export default class AppointmentRepository implements IAppointmentRepository {
    model = AppointmentModel
    async create(appointment: IAppointment): Promise<void> {
        await this.model.create(appointment)
    }
    async update(appointment: IAppointment): Promise<void> {
        if (!isValidObjectId(appointment._id!)) throw new Error("Invalid Object Id");
        await this.model.findByIdAndUpdate(appointment._id,appointment,{new:true})
    }

    async findOneBySlotId(slotId: string): Promise<IAppointment | null> {
        return await this.model.findOne({slotId});
    }
    async updateStatusMany(appointmentIds: string[], status: AppointmentStatus): Promise<void> {
        await this.model.updateMany({_id:{$in:appointmentIds}},{status})
    }

    async updateManyBySlotIds(slotIds: string[], fields: Partial<IAppointment>): Promise<void> {
        await this.model.updateMany({ slotId: { $in: slotIds } }, fields);
    }
    
}