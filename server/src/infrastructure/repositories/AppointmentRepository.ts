import mongoose from "mongoose";
import IAppointment, { AppointmentStatus, IExtendedAppointment } from "../../domain/entities/IAppointment";
import IAppointmentRepository from "../../domain/interface/repositories/IAppointmentRepository";
import { PaginatedResult } from "../../types";
import AppointmentModel from "../database/AppointmentModel";
import { getPaginatedResult } from "./getPaginatedResult";

export default class AppointmentRepository implements IAppointmentRepository {
    model = AppointmentModel
    
    async create(appointment: IAppointment): Promise<string> {
        return (await this.model.create(appointment))._id
    }
    async update(appointment: IAppointment): Promise<void> {
        await this.model.findByIdAndUpdate(appointment._id, appointment, { new: true })
    }
    
    async findDetailsById(appointmentId: string): Promise<IExtendedAppointment | null> {
        const objectId = new mongoose.Types.ObjectId(appointmentId);
        
        const appointment = await this.model.aggregate([
            { $match: { _id: objectId } },
            {
                $lookup: {
                    from: 'patients',
                    localField: 'patientId',
                    foreignField: '_id',
                    as: 'patient'
                }
            },
            {
                $lookup: {
                    from: 'slots',
                    localField: 'slotId',
                    foreignField: '_id',
                    as: 'slot'
                }
            },
            { $unwind: { path: '$patient', preserveNullAndEmptyArrays: true } },
            { $unwind: { path: '$slot', preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    'patient.password': 0,
                    'patient.token': 0
                }
            }
        ]).exec();
        
        if (!appointment || appointment.length === 0) {
            return null; 
        }
    
        return appointment[0] as IExtendedAppointment;
    }
    
    
    
    
    async findManyByDoctorId(doctorId: string, status: AppointmentStatus, offset: number, limit: number): Promise<PaginatedResult<IAppointment> | null> {
        const totalItems = await this.model.countDocuments({ doctorId, status });
        const items = await this.model.find({ doctorId, status })
            .skip(offset)
            .limit(limit)
            .exec();
      return getPaginatedResult(totalItems,offset,limit,items)
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


    async updateManyBySlotIds(slotIds: string[], fields: Partial<IAppointment>): Promise<void> {
        await this.model.updateMany({ slotId: { $in: slotIds } }, fields);
    }

    async updateAppointmentStatusToConfirmed(appointmentId: string): Promise<void> {
        await this.model.findByIdAndUpdate(appointmentId, { status: AppointmentStatus.PENDING });
    }

}