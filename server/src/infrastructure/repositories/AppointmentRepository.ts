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
            {
                $lookup: {
                    from: 'doctors',
                    localField: 'doctorId',
                    foreignField: '_id',
                    as: 'doctor'
                }
            },
            { $unwind: { path: '$patient', preserveNullAndEmptyArrays: true } },
            { $unwind: { path: '$slot', preserveNullAndEmptyArrays: true } },
            { $unwind: { path: '$doctor', preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    'patient.password': 0,
                    'patient.token': 0,
                    'doctor.password': 0,
                    'doctor.token': 0
                }
            }
        ]).exec();
        
        if (!appointment || appointment.length === 0) {
            return null; 
        }
        
        return appointment[0] as IExtendedAppointment;
    }
    
    async findMayByPatientId(patientId:string,offset: number, limit: number, status?: AppointmentStatus):Promise<PaginatedResult<IAppointment>|null>{
        const filter: { patientId: string; status?: AppointmentStatus } = { patientId };
        if (status) {
            filter.status = status;
        }
        const totalItems = await this.model.countDocuments(filter);
        const items = await this.model.find(filter)
            .skip(offset)
            .limit(limit)
            .exec();
        return getPaginatedResult(totalItems, offset, limit, items);
    }
    
    
    async findManyByDoctorId(doctorId: string, offset: number, limit: number, status?: AppointmentStatus): Promise<PaginatedResult<IAppointment> | null> {
        const filter: { doctorId: string; status?: AppointmentStatus } = { doctorId };
        if (status) {
            filter.status = status;
        }
        const totalItems = await this.model.countDocuments(filter);
        const items = await this.model.find(filter)
            .skip(offset)
            .limit(limit)
            .exec();
        return getPaginatedResult(totalItems, offset, limit, items);
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